const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoute");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", bookRoutes);

// Database Connection
connectDB();

module.exports = app;
