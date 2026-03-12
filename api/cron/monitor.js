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

  // Check 2: Resend connectivity (send to test address — works with send-only keys)
  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "delivered@resend.dev",
          subject: "Monitor check",
          text: "ping",
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        errors.push(`Resend API error (${response.status}): ${data.message || "unknown"}`);
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
      // Circuit breaker: check if a self-heal already ran in the last 12 hours.
      // If it did, the fix either hasn't deployed yet or it didn't work —
      // either way, don't trigger again to avoid an infinite loop.
      try {
        const runsRes = await fetch(
          "https://api.github.com/repos/dballard10/Dylan-Ballard-Personal-Website/actions/workflows/self-heal-contact.yml/runs?per_page=1&status=completed",
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: "application/vnd.github+json",
            },
          }
        );
        if (runsRes.ok) {
          const runsData = await runsRes.json();
          const lastRun = runsData.workflow_runs?.[0];
          if (lastRun) {
            const lastRunTime = new Date(lastRun.created_at).getTime();
            const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
            if (lastRunTime > twelveHoursAgo) {
              console.log(JSON.stringify({
                type: "SELF_HEAL_SKIPPED",
                timestamp,
                reason: "A self-heal ran within the last 12 hours — waiting for cooldown",
                lastRun: lastRun.created_at,
              }));
              return res.status(500).json({ status: "error", errors, timestamp, skipped: true });
            }
          }
        }
      } catch (checkError) {
        // If we can't check, proceed with dispatch — better to over-trigger than miss
        console.error(JSON.stringify({
          type: "COOLDOWN_CHECK_FAILED",
          timestamp,
          error: checkError.message,
        }));
      }

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
