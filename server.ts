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

  // Start listening IMMEDIATELY to satisfy platform health checks
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`--- SERVER LISTENING ON PORT ${PORT} ---`);
  });

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    console.log("Health check hit");
    res.json({ 
      status: "ok", 
      environment: process.env.NODE_ENV,
      emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    });
  });

  // Simple test route
  app.get("/api/test", (req, res) => {
    console.log("Test route hit");
    res.send("Server is alive and responding!");
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("POST /api/contact hit with body:", req.body);
    try {
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
        console.log("Validation failed: missing required fields");
        return res.status(400).json({ error: "Missing required fields (Name, Phone, Email)" });
      }

      // Create a transporter
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

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not set. Logging to console.");
        console.log(mailOptions.text);
        return res.status(200).json({ 
          message: "Form submitted successfully (logged to console as credentials missing)",
          debug: "Credentials missing"
        });
      }

      console.log("Sending email...");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error in /api/contact:", error);
      res.status(500).json({ 
        error: "Failed to send email.",
        details: error.message
      });
    }
  });

  // Catch-all for undefined API routes
  app.all("/api/*", (req, res) => {
    console.log(`404 API: ${req.method} ${req.url}`);
    res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
  });

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  // Initialize Vite or serve static files AFTER starting the listener
  if (process.env.NODE_ENV !== "production") {
    console.log("Initializing Vite middleware...");
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware attached.");
    } catch (viteError) {
      console.error("Vite failed to start:", viteError);
    }
  } else {
    const distPath = path.resolve(__dirname, "dist");
    console.log(`Serving static files from: ${distPath}`);
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.warn("dist directory not found. Using Vite fallback.");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler caught:", err);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "An unexpected server error occurred.",
        details: err.message
      });
    }
  });
}

// Process error handlers to prevent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Wrap startServer in a try-catch
startServer().catch(err => {
  console.error("Failed to start server:", err);
});
