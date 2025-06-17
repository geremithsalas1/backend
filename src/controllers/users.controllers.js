import { z } from "zod";
import {
  getAllUsers,
  getUserById,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
} from "../models/users.models.js";

// Esquema Zod para crear usuario
const userSchema = z.object({
  first_name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  last_name: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthdate: z.string().optional(),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password_hash: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  role_id: z.number({ invalid_type_error: "El rol es obligatorio y debe ser un número" }),
  status: z.string().optional(),
});

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

export const createUser = async (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const newUser = await createUserModel(parsed.data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const parsed = userSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedUser = await updateUserModel(id, parsed.data);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
