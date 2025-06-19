import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";


const router = Router();

router.get("/users", authenticateToken, getUsers);

router.get("/users/:id", authenticateToken, getUser);

router.post("/users", requireAdmin, authenticateToken, createUser);

router.delete("/users/:id", requireAdmin, authenticateToken, deleteUser);

router.put("/users/:id", requireAdmin, authenticateToken, updateUser);

export default router;
