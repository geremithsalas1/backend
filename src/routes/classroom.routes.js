import { Router } from "express";
import {
  createClassroom,
  deleteClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
} from "../controllers/classroom.controllers.js";

const router = Router();

router.get("/classrooms", getClassrooms);

router.get("/classrooms/:id", getClassroom);

router.post("/classrooms", createClassroom);

router.delete("/classrooms/:id", deleteClassroom);

router.put("/classrooms/:id", updateClassroom);

export default router;
