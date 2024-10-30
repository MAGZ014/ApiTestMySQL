import { Router } from "express";
import { AuthController } from "../../controllers/authController.js";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));
