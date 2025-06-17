import { z } from "zod";
import {
  getAllSections,
  getSectionById,
  createSection as createSectionModel,
  updateSection as updateSectionModel,
  deleteSection as deleteSectionModel,
} from "../models/sections.models.js";

// Esquema Zod para validar sección
const sectionSchema = z.object({
  subject_id: z.number({ invalid_type_error: "El ID de materia es obligatorio y debe ser un número" }),
  chef_id: z.number({ invalid_type_error: "El ID de chef es obligatorio y debe ser un número" }),
  classroom: z.string().optional(),
  max_capacity: z.number({ invalid_type_error: "La capacidad máxima es obligatoria y debe ser un número" }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const getSections = async (req, res) => {
  try {
    const sections = await getAllSections();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sections", error: error.message });
  }
};

export const getSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await getSectionById(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: "Error fetching section", error: error.message });
  }
};

export const createSection = async (req, res) => {
  const parsed = sectionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const newSection = await createSectionModel(parsed.data);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: "Error creating section", error: error.message });
  }
};

export const updateSection = async (req, res) => {
  const { id } = req.params;
  const parsed = sectionSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedSection = await updateSectionModel(id, parsed.data);
    res.json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: "Error updating section", error: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSectionModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Section not found" });
  }
};
