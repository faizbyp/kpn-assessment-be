import {
  handleCreateCriteria,
  handleDeleteCriteria,
  handleGetCriteria,
  handleUpdateCriteria,
} from "#dep/controllers/CriteriaController";
import { Router } from "express";
const Criteria = Router();

Criteria.get("/", handleGetCriteria);
Criteria.post("/", handleCreateCriteria);
Criteria.patch("/:id", handleUpdateCriteria);
Criteria.delete("/:id", handleDeleteCriteria);

export default Criteria;
