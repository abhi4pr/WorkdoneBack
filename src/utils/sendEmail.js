import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // 587 for TLS, 465 for SSL
    secure: false, // true for ssl, false for tls
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
};

export default sendEmail;
