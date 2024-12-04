import {
  handleCreateQuestion,
  handleDeleteQuestion,
  handleGetQuestion,
  handleGetQuestionById,
  handleUpdateQuestion,
} from "#dep/controllers/QuestionController";
import { Router } from "express";
const Question = Router();

Question.post("/", handleCreateQuestion);
Question.get("/", handleGetQuestion);
Question.get("/:id", handleGetQuestionById);
Question.patch("/:id", handleUpdateQuestion);
Question.delete("/:id", handleDeleteQuestion);

export default Question;
