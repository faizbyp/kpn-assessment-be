import { handleGetPage } from "#dep/controllers/PageController";
import { Router } from "express";
const Question = Router();

Question.get("/", handleGetPage);

export default Question;
