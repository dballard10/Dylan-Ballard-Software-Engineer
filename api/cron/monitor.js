const { Resend } = require("resend");

module.exports = async function handler(req, res) {
  // Verify this is a legitimate cron request (Vercel sets this header)
  const authHeader = req.headers["authorization"];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // In development or if CRON_SECRET isn't set, allow the request
    if (process.env.CRON_SECRET) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  const timestamp = new Date().toISOString();
  const errors = [];

  // Check 1: API key exists
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    errors.push("RESEND_API_KEY is not set");
  }

  // Check 2: Resend connectivity
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.domains.list();
      if (error) {
        errors.push(`Resend API error: ${error.message}`);
      }
    } catch (error) {
      errors.push(`Resend connection failed: ${error.message}`);
    }
  }

  // If errors found, trigger GitHub Action for self-healing
  if (errors.length > 0) {
    console.error(JSON.stringify({
      type: "HEALTH_CHECK_FAILED",
      timestamp,
      errors,
    }));

    const githubToken = process.env.GITHUB_PAT;
    if (githubToken) {
      try {
        await fetch(
          "https://api.github.com/repos/dballard10/Dylan-Ballard-Personal-Website/dispatches",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: "application/vnd.github+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event_type: "contact-form-error",
              client_payload: { errors, timestamp },
            }),
          }
        );
        console.log(JSON.stringify({
          type: "SELF_HEAL_TRIGGERED",
          timestamp,
          errors,
        }));
      } catch (dispatchError) {
        console.error(JSON.stringify({
          type: "DISPATCH_FAILED",
          timestamp,
          error: dispatchError.message,
        }));
      }
    }

    return res.status(500).json({ status: "error", errors, timestamp });
  }

  console.log(JSON.stringify({
    type: "HEALTH_CHECK_PASSED",
    timestamp,
  }));

  return res.status(200).json({ status: "ok", timestamp });
};
