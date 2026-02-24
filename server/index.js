require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scraperRoutes = require("./routes/scraperRoutes");

const app = express();

// =============================
// Connect Database
// =============================
connectDB();

// =============================
// Middlewares
// =============================
app.use(
  cors({
    origin: "https://scraper-one-omega.vercel.app",
  })
);app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================
// Root Route (IMPORTANT)
// =============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Job Scraper Backend is Live on Render",
  });
});

// =============================
// API Routes
// =============================
app.use("/api", scraperRoutes);

// =============================
// 404 Handler (Optional but Good Practice)
// =============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================
// Global Error Handler
// =============================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});