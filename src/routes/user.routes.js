import { Router } from "express";
import {
  createUser,
  deletesUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/user", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.delete("/users/:id", deletesUser);

router.put("/users:id", updateUser);

export default router;
