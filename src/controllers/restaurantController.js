const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Restaurants (with optional city filter)
const getRestaurants = async (req, res) => {
  try {
    const { city } = req.query;

    let restaurants;

    if (city) {
      restaurants = await Restaurant.find({
        city: city,
      });
    } else {
      restaurants = await Restaurant.find();
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Restaurant
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Foods By Restaurant
const getFoodsByRestaurant = async (req, res) => {
  try {
    const foods = await Food.find({
      restaurantId: req.params.restaurantId,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(
      req.params.id
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  getFoodsByRestaurant,
  updateRestaurant,
  deleteRestaurant,
};