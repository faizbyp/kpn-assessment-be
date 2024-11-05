import {
  handleCreateBusinessUnit,
  handleDeleteBusinessUnit,
  handleGetBusinessUnit,
  handleUpdateBusinessUnit,
} from "@/controllers/BusinessUnitController";
import { Router } from "express";
const BusinessUnit = Router();

BusinessUnit.get("/", handleGetBusinessUnit);
BusinessUnit.post("/", handleCreateBusinessUnit);
BusinessUnit.patch("/:id", handleUpdateBusinessUnit);
BusinessUnit.delete("/:id", handleDeleteBusinessUnit);

export default BusinessUnit;
