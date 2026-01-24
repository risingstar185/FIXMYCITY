import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const sendOTPEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #075e54;">🔐 FixMyCity Web Verification</h2>
      <p>Hi there,</p>
      <p>Your one-time password (OTP) to verify your FixMyCity account is:</p>
      <h1 style="
        background: #e0f7fa;
        color: #000;
        padding: 10px 20px;
        display: inline-block;
        border-radius: 6px;
        letter-spacing: 3px;
      ">
        ${otp}
      </h1>
      <p><strong>This OTP is valid for the next 5 minutes.</strong></p>
      <p>Please do not share this code with anyone.</p>
      <p>If you didn’t request this OTP, please ignore this email.</p>
      <p style="margin-top: 20px;">
        Thanks & Regards,<br/>
        <strong>FixMyCity Web Security Team</strong>
      </p>
      <hr style="margin: 30px 0;" />
      <small style="color: #777;">
        This is an automated message. Please do not reply.
      </small>
    </div>
  `;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "FixMyCity Web",
          email: "patelayush9554@gmail.com", // works without domain verify
        },
        to: [{ email }],
        subject: "Your FixMyCity Verification Code",
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ OTP Email sent successfully:", response.data.messageId);
    return true;
  } catch (error) {
    console.error("❌ Brevo Error:", error.response?.data || error.message);
    return false;
  }
};
