import {
  getAllSections,
  getSectionById,
  createSection as createSectionModel,
  updateSection as updateSectionModel,
  deleteSection,
} from "../models/sections.models.js";

export const getSections = async (req, res) => {
  try { 
    const Sections = await getAllSections();
    res.json(Sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    // Provide more details in the response for debugging (remove in production)
    res.status(500).json({ message: "Error fetching sections", error: error.message });
  }
  
};

export const getSection = async (req, res) => {
  try {
    const { id } = req.params;
    const Section = await getSectionById(id);
    if (!Section) {
      return res.status(404).jsonn({ message: "Section not found" });
    }
    res.json(Section);
  } catch (error) {
    res.status(404).json({ message: "Section not found" });
  }
};

export const createSection = async (req, res) => {
  try {
    const data = req.body;
    const newSection = await createSectionModel(data);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: "Error creating Section" });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedSection = await updateSectionModel(id, data);
    res.json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: "Error updating section" });
  }
};

export const deleteSection= async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSectionModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Sectionc not found" });
  }
};
