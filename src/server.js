const restaurantRoutes = require("./routes/restaurantRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Food = require("./models/Food");
const User = require("./models/User");

const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Temporary Route to View Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Temporary Route to Add Sample Food
app.get("/add-sample-food", async (req, res) => {
  try {
    const food = await Food.create({
      name: "Chicken Burger",
      category: "Fast Food",
      description: "Juicy grilled chicken burger",
      price: 149,
      image: "burger.jpg",
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});