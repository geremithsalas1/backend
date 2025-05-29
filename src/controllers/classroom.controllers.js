import {
  getAllClassrooms,
  getClassroomById,
  createClassroom as createClassroomModel,
  updateClassroom as updateClassroomModel,
  deleteClassroom as deleteClassroomModel,
} from "../models/classroom.models.js";

export const getClassrooms = async (req, res) => {
  try {
    const Classrooms = await getAllClassrooms();
    res.json(Classrooms);
  } catch (error) {
    console.error("Error fetching Classrooms:", error);
    // Provide more details in the response for debugging (remove in production)
    res.status(500).json({ message: "Error fetching Classrooms", error: error.message });
  }
  
};

export const getClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const Classroom = await getClassroomById(id);
    if (!Classroom) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(Classroom);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

export const createClassroom = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await createClassroomModel(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const updateClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await updateClassroomModel(id, data);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
};

export const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteClassroomModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
