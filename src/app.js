const express = require("express");
const cors = require("cors");

const foodRoutes = require("./src/routes/foodRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Ordering API Running");
});

app.use("/api/foods", foodRoutes);

module.exports = app;