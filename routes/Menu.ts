import { handleGetAdminMenu, handleGetAllMenu } from "#dep/controllers/MenuController";
import { Router } from "express";
const Question = Router();

Question.get("/", handleGetAllMenu);
Question.get("/admin", handleGetAdminMenu);

export default Question;
