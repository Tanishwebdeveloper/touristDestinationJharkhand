import Guide from "../models/guideSchema.js";
import { v4 as uuidv4 } from "uuid";

export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find({});
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createGuide = async (req, res) => {
  try {
    const guideData = req.body;
    const newGuide = new Guide(guideData);
    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update guide by ID
export const updateGuide = async (req, res) => {
  try {
    const guideId = req.params.id;
    const updateData = req.body;
    const updatedGuide = await Guide.findByIdAndUpdate(guideId, updateData, { new: true });
    if (!updatedGuide) return res.status(404).json({ error: "Guide not found" });
    res.json(updatedGuide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete guide by ID
export const deleteGuide = async (req, res) => {
  try {
    const guideId = req.params.id;
    const deletedGuide = await Guide.findByIdAndDelete(guideId);
    if (!deletedGuide) return res.status(404).json({ error: "Guide not found" });
    res.json({ message: "Guide deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}