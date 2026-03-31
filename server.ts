import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("--- STARTING SERVER.TS ---");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      environment: process.env.NODE_ENV,
      emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res, next) => {
    try {
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

      if (!fullName || !phone || !email) {
        return res.status(400).json({ error: "Missing required fields (Name, Phone, Email)" });
      }

      // Create a transporter
      // Note: For production, use real SMTP credentials in .env
      const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
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
      console.error("Error in /api/contact route:", error);
      res.status(500).json({ 
        error: "Failed to send email. Please check your SMTP credentials.",
        details: error.message
      });
    }
  });

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler caught:", err);
    res.status(500).json({ 
      error: "An unexpected server error occurred.",
      details: err.message
    });
  });

  // Simple root route for testing
  app.get("/api/test", (req, res) => {
    res.send("Server is alive!");
  });

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Using Vite middleware in development mode...");
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware attached successfully.");
    } catch (viteError) {
      console.error("Failed to start Vite server:", viteError);
      // Fallback if Vite fails
      app.get("*", (req, res) => {
        res.status(500).send("Vite failed to start. Check server logs.");
      });
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    console.log(`Serving static files from: ${distPath}`);
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn("dist directory not found! Falling back to Vite middleware for safety.");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Process error handlers to prevent crashes
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

// Wrap startServer in a try-catch
startServer().catch(err => {
  console.error("Failed to start server:", err);
});
