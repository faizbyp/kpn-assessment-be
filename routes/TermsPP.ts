import {
  handleGetTermsPP,
  handleUpdatePP,
  handleUpdateTerms,
} from "@/controllers/TermsPPController";
import { Router } from "express";
const TermsPP = Router();

TermsPP.get("/", handleGetTermsPP);
TermsPP.patch("/terms", handleUpdateTerms);
TermsPP.patch("/pp", handleUpdatePP);

export default TermsPP;
