const { Resend } = require("resend");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const checks = {
    apiKey: false,
    resendConnection: false,
  };

  // Check API key exists
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      error: "RESEND_API_KEY environment variable is not set",
      checks,
    });
  }
  checks.apiKey = true;

  // Test Resend connectivity by validating the API key format and making a
  // lightweight API call. We use the /emails endpoint with Resend's built-in
  // test address which works with send-restricted keys.
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
        subject: "Health check",
        text: "ping",
      }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return res.status(500).json({
        status: "error",
        error: `Resend API error (${response.status}): ${data.message || "unknown"}`,
        checks,
      });
    }
    checks.resendConnection = true;
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: `Resend connection failed: ${error.message}`,
      checks,
    });
  }

  return res.status(200).json({
    status: "ok",
    checks,
    timestamp: new Date().toISOString(),
  });
};
