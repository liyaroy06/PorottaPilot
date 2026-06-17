const Food = require("../models/Food");

// Create Food
const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create food",
      error: error.message,
    });
  }
};

// Get All Foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("restaurantId");

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
};

// Get Single Food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate("restaurantId");

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch food",
      error: error.message,
    });
  }
};

// Update Food
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("restaurantId");

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food",
      error: error.message,
    });
  }
};

// Delete Food
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food",
      error: error.message,
    });
  }
};

module.exports = {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};