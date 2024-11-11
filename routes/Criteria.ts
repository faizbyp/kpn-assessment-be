import {
  handleCreateCriteria,
  handleDeleteCriteria,
  handleGetCriteria,
} from "#dep/controllers/CriteriaController";
import { Router } from "express";
const Criteria = Router();

Criteria.get("/", handleGetCriteria);
Criteria.post("/", handleCreateCriteria);
Criteria.delete("/:id", handleDeleteCriteria);

export default Criteria;
