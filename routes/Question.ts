import {
  handleCreateQuestion,
  handleGetQuestion,
  handleGetQuestionById,
} from "#dep/controllers/QuestionController";
import { Router } from "express";
const Question = Router();

Question.post("/", handleCreateQuestion);
Question.get("/", handleGetQuestion);
Question.get("/:id", handleGetQuestionById);

export default Question;
