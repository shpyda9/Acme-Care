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

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
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
      service: 'outlook', // or use host/port for other services
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
        console.log("Email credentials not set. Logging form data instead:");
        console.log(mailOptions.text);
        return res.status(200).json({ message: "Form submitted successfully (logged to console as credentials missing)" });
      }

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
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
