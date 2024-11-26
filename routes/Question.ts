import {
  handleCreateQuestion,
  handleDeleteQuestion,
  handleGetQuestion,
  handleGetQuestionById,
} from "#dep/controllers/QuestionController";
import { Router } from "express";
const Question = Router();

Question.post("/", handleCreateQuestion);
Question.get("/", handleGetQuestion);
Question.get("/:id", handleGetQuestionById);
Question.delete("/:id", handleDeleteQuestion);

export default Question;
