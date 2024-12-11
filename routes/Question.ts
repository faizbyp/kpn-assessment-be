import {
  handleCreateQuestion,
  handleDeleteQuestion,
  handleGetQuestion,
  handleGetQuestionById,
  handleUpdateQuestion,
} from "#dep/controllers/QuestionController";
import { checkPermission } from "#dep/middleware/auth";
import { Router } from "express";
const Question = Router();

Question.post("/", checkPermission("fcreate", 7), handleCreateQuestion);
Question.get("/", checkPermission("fread", 7), handleGetQuestion);
Question.get("/:id", checkPermission("fread", 7), handleGetQuestionById);
Question.patch("/:id", checkPermission("fupdate", 7), handleUpdateQuestion);
Question.delete("/:id", checkPermission("fdelete", 7), handleDeleteQuestion);

export default Question;
