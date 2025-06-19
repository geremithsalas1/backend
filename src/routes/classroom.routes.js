import { Router } from "express";
import {
  createClassroom,
  deleteClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
} from "../controllers/classroom.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/classrooms", authenticateToken, getClassrooms);

router.get("/classrooms/:id", authenticateToken, getClassroom);

router.post("/classrooms", requireAdmin, authenticateToken, createClassroom);

router.delete("/classrooms/:id", requireAdmin,authenticateToken, deleteClassroom);

router.put("/classrooms/:id", requireAdmin,authenticateToken, updateClassroom);

export default router;
