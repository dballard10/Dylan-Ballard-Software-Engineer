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

  // Test Resend connectivity (list domains — no email sent)
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.domains.list();
    if (error) {
      return res.status(500).json({
        status: "error",
        error: `Resend API error: ${error.message}`,
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
