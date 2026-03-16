const { Resend } = require("resend");

// Initialize Resend with your API key
// In production, this should be set as an environment variable
let resend = new Resend(
  process.env.RESEND_API_KEY || "re_jTpsrL48_ALcLJKBKQwXBHerQgdnL6xKy"
);

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message:
          "Missing required fields: firstName, lastName, email, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // You'll need to verify your domain and update this
      to: "dylanballard.builds@gmail.com",
      subject: `Contact Form: Message from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>This message was sent through your personal website contact form.</p>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}

---
This message was sent through your personal website contact form.
      `,
    });

    if (emailResponse.error) {
      console.error(JSON.stringify({
        type: "RESEND_API_ERROR",
        timestamp: new Date().toISOString(),
        error: emailResponse.error,
        context: { firstName, email },
      }));
      return res.status(500).json({
        message: "Failed to send email. Please try again later.",
      });
    }

    return res.status(200).json({
      message: "Email sent successfully!",
      id: emailResponse.data?.id,
    });
  } catch (error) {
    console.error(JSON.stringify({
      type: "UNHANDLED_ERROR",
      timestamp: new Date().toISOString(),
      error: error.message || String(error),
      stack: error.stack,
    }));
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports._setClient = (client) => {
  resend = client;
};
