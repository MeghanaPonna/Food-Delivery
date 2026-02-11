import foodModel from "../models/foodModel.js";
import fs from "fs";

// ADD FOOD (admin protected via middleware)
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// LIST FOOD (public)
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching food" });
  }
};

// REMOVE FOOD (admin protected via middleware)
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // delete image file
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    await foodModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error removing food",
    });
  }
};

export { addFood, listFood, removeFood };
