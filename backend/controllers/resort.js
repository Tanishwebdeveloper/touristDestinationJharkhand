import Resort from "../models/resortSchema.js";
import { v4 as uuidv4 } from "uuid";

export const getAllResorts = async (req, res) => {
  try {
    const { type } = req.query; // filter by type if provided
    let filter = {};
    if (type) {
      filter.type = type;
    }

    const resorts = await Resort.find(filter);
    res.json(resorts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resorts", error: error.message });
  }
};

export const createResort = async (req, res) => {
  try {
    const newResort = new Resort({
      ...req.body,
      resort_id: uuidv4(),  // generate unique ID here
    });
    const savedResort = await newResort.save();
    res.status(201).json(savedResort);
  } catch (error) {
    console.error("Create resort error:", error);
    res.status(500).json({ message: "Create resort failed", error: error.message });
  }
};

export const updateResort = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResort = await Resort.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedResort) return res.status(404).json({ message: "Resort not found" });
    res.json(updatedResort);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteResort = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResort = await Resort.findByIdAndDelete(id);
    if (!deletedResort) return res.status(404).json({ message: "Resort not found" });
    res.json({ message: "Resort deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};