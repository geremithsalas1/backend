import { z } from "zod";
import {
  getAllClassrooms,
  getClassroomById,
  createClassroom as createClassroomModel,
  updateClassroom as updateClassroomModel,
  deleteClassroom as deleteClassroomModel,
} from "../models/classroom.models.js";

// Esquema Zod para validar aula
const classroomSchema = z.object({
  name: z.string({ required_error: "El nombre es obligatorio" }).min(1, { message: "El nombre es obligatorio" }),
  location: z.string().optional(),
  capacity: z.number({ invalid_type_error: "La capacidad debe ser un número" }).optional(),
  resources: z.string().optional(),
});

export const getClassrooms = async (req, res) => {
  try {
    const classrooms = await getAllClassrooms();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classrooms", error: error.message });
  }
};

export const getClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await getClassroomById(id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classroom", error: error.message });
  }
};

export const createClassroom = async (req, res) => {
  const parsed = classroomSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const newClassroom = await createClassroomModel(parsed.data);
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(400).json({ message: "Error creating classroom", error: error.message });
  }
};

export const updateClassroom = async (req, res) => {
  const { id } = req.params;
  const parsed = classroomSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedClassroom = await updateClassroomModel(id, parsed.data);
    res.json(updatedClassroom);
  } catch (error) {
    res.status(400).json({ message: "Error updating classroom", error: error.message });
  }
};

export const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteClassroomModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Classroom not found" });
  }
};
