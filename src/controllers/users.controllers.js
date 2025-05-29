import {
  getAllUsers,
  getUserById,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
} from "../models/users.models.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    // Provide more details in the response for debugging (remove in production)
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
  
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await createUserModel(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await updateUserModel(id, data);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.status(204).json({ message: "User deleted correctly" });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
