import { handleGetMenu } from "#dep/controllers/MenuController";
import { Router } from "express";
const Question = Router();

Question.get("/", handleGetMenu);

export default Question;
