import { handleCreateQuestion } from "#dep/controllers/QuestionController";
import { Router } from "express";
const Question = Router();

Question.post("/", handleCreateQuestion);

export default Question;
