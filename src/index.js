import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api",userRoutes);
app.use("/api",authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
