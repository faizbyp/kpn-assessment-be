import { Router } from "express";
import {
  handleReadBusinessUnit,
  handleCreateBusinessUnit,
  handleUpdateBusinessUnit,
  handleDeleteBusinessUnit,
} from "@/models/BusinessUnitModel";
const BusinessUnit = Router();

BusinessUnit.get("/", handleReadBusinessUnit);
BusinessUnit.post("/", handleCreateBusinessUnit);
BusinessUnit.patch("/:id", handleUpdateBusinessUnit);
BusinessUnit.delete("/:id", handleDeleteBusinessUnit);

export default BusinessUnit;
