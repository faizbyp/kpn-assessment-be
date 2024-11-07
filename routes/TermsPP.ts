import {
  handleGetBrief,
  handleGetTermsPP,
  handleUpdateBrief,
  handleUpdatePP,
  handleUpdateTerms,
} from "#dep/controllers/TermsPPController";
import { Router } from "express";
const TermsPP = Router();
export const ShortBrief = Router();

TermsPP.get("/", handleGetTermsPP);
TermsPP.patch("/terms", handleUpdateTerms);
TermsPP.patch("/pp", handleUpdatePP);

ShortBrief.get("/", handleGetBrief);
ShortBrief.patch("/", handleUpdateBrief);

export default TermsPP;
