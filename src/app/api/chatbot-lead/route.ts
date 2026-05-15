import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Log the lead data to the server console for immediate visibility
    console.log("🚀 NEW CHATBOT LEAD RECEIVED:");
    console.log("--------------------------------------------------");
    console.log(`Service:      ${data.service || "N/A"}`);
    console.log(`Description:  ${data.projectDescription || "N/A"}`);
    console.log(`Stage:        ${data.projectStage || "N/A"}`);
    console.log(`Budget:       ${data.budget || "N/A"}`);
    console.log(`Timeline:     ${data.timeline || "N/A"}`);
    console.log(`Name:         ${data.name || "N/A"}`);
    console.log(`Phone:        ${data.whatsapp || "N/A"}`);
    console.log(`Email:        ${data.email || "N/A"}`);
    console.log(`Callback:     ${data.callbackPreference || "N/A"}`);
    console.log(`Source Page:  ${data.conversationSource || "N/A"}`);
    console.log(`Timestamp:    ${data.timestamp || new Date().toISOString()}`);
    console.log("--------------------------------------------------");

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      NOTIFICATION_EMAIL,
    } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS && NOTIFICATION_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Noryant Bot" <${SMTP_USER}>`,
        to: NOTIFICATION_EMAIL,
        subject: `New Lead: ${data.name || "Unknown"} - ${data.service || "Inquiry"}`,
        text: `
New Chatbot Inquiry Received

Name: ${data.name || "N/A"}
Phone: ${data.whatsapp || "N/A"}
Email: ${data.email || "N/A"}
Service: ${data.service || "N/A"}
Budget: ${data.budget || "N/A"}
Timeline: ${data.timeline || "N/A"}
Project: ${data.projectDescription || "N/A"}
Callback Preference: ${data.callbackPreference || "N/A"}
Source Page: ${data.conversationSource || "N/A"}
Timestamp: ${data.timestamp || new Date().toISOString()}
        `.trim(),
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Lead notification email sent successfully.");
    } else {
      console.log("⚠️ SMTP environment variables not configured. Skipping email notification.");
      console.log("Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and NOTIFICATION_EMAIL in your .env file.");
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error processing chatbot lead:", error);
    return NextResponse.json({ success: false, error: "Failed to process lead." }, { status: 500 });
  }
}
