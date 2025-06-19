import { Router } from "express";
import {
  createSection,
  deleteSection,
  getSection,
  getSections,
  updateSection,
} from "../controllers/sections.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/sections", authenticateToken, getSections);

router.get("/sections/:id",authenticateToken, getSection);

router.post("/sections",requireAdmin,authenticateToken, createSection);

router.delete("/sections/:id",requireAdmin,authenticateToken, deleteSection);

router.put("/sections/:id",requireAdmin,authenticateToken, updateSection);

export default router;
