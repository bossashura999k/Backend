import express from "express";

const app = express();
app.use(express.json());
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

// "http://localhost:4000/api/v1/users/register"
export default app;