import { handleGetTermsPP } from "@/controllers/TermsPPController";
import { Router } from "express";
const TermsPP = Router();

TermsPP.get("/", handleGetTermsPP);

export default TermsPP;
