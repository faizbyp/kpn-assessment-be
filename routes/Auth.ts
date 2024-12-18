import AuthController from "#dep/controllers/AuthController";
import { Router } from "express";
const Auth = Router();

Auth.post("/darwin", AuthController.VerifyDarwinToken);

export default Auth;
