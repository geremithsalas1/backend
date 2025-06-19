import { z } from "zod";
import {
  getAllUsers,
  getUserById,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
  getUserByEmail, // Debes agregar esta función en tu modelo
} from "../models/users.models.js";
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// Esquema Zod para crear usuario
const userSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthdate: z.string().optional(),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password_hash: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  role_id: z.number({
    invalid_type_error: "El rol es obligatorio y debe ser un número",
  }),
  status: z.string().optional(),
});

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    const publicUsers = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role_id: user.role_id,
      status: user.status,
    }));
    res.json(publicUsers);
  } catch (error) {
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
    const publicUser  = user;
    res.json({
      id: publicUser.id,
      first_name: publicUser.first_name,
      last_name: publicUser.last_name,
      email: publicUser.email,
      role_id: publicUser.role_id,
      status: publicUser.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


export const createUser = async (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    const mensajes = parsed.error.errors.map(e => e.message);
    return res.status(400).json({ message: "Error: "+mensajes }); }

  try {
    // Verificación de email único
 
    const newUser = await createUserModel(parsed.data);
    res.status(201).json(newUser);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const parsed = userSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    const mensajes = parsed.error.errors.map(e => e.message);
    return res.status(400).json({ message: "Error: "+mensajes });
  }
  try {
    const updatedUser = await updateUserModel(id, parsed.data);
    res.json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.status(204).json({ message: "User deleted correctly" });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
