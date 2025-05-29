import { Router } from "express";
import {
  createSection,
  deleteSection,
  getSection,
  getSections,
  updateSection,
} from "../controllers/sections.controllers.js";

const router = Router();

router.get("/sections", getSections);

router.get("/sections/:id", getSection);

router.post("/sections", createSection);

router.delete("/sections/:id", deleteSection);

router.put("/sections:id", updateSection);

export default router;
