const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  getFoodsByRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);
router.get("/", getRestaurants);

// Get all foods of a restaurant
router.get("/:restaurantId/foods", getFoodsByRestaurant);

router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;