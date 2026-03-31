import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("Received contact form submission:", req.body);
    const { 
      fullName, 
      phone, 
      email, 
      pickupLocation, 
      dropoffLocation, 
      transportType, 
      date, 
      time, 
      notes 
    } = req.body;

    // Create a transporter
    // Note: For production, use real SMTP credentials in .env
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'acmecarellc@outlook.com',
      to: 'acmecarellc@outlook.com',
      subject: `New Booking Request from ${fullName}`,
      text: `
        New Booking Request Details:
        ---------------------------
        Full Name: ${fullName}
        Phone: ${phone}
        Email: ${email}
        Pickup Location: ${pickupLocation}
        Drop-off Location: ${dropoffLocation}
        Transport Type: ${transportType}
        Date: ${date}
        Time: ${time}
        Additional Notes: ${notes || 'None'}
      `,
    };

    try {
      // If credentials are not set, we'll just log it for now to avoid crashing in preview
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials (EMAIL_USER/EMAIL_PASS) not set in environment variables.");
        console.log("Form data logged to console:");
        console.log(mailOptions.text);
        return res.status(200).json({ 
          message: "Form submitted successfully (logged to console as credentials missing)",
          debug: "Credentials missing"
        });
      }

      console.log("Attempting to send email via Outlook SMTP...");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to acmecarellc@outlook.com");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ 
        error: "Failed to send email. Please check your SMTP credentials.",
        details: error.message
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
