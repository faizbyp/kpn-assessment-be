import {
  handleCreateFunctionMenu,
  handleDeleteFunctionMenu,
  handleGetFunctionMenu,
  handleUpdateFunctionMenu,
} from "#dep/controllers/FunctionMenuController";
import { Router } from "express";
const FunctionMenu = Router();

FunctionMenu.get("/", handleGetFunctionMenu);
FunctionMenu.post("/", handleCreateFunctionMenu);
FunctionMenu.delete("/:id", handleDeleteFunctionMenu);
FunctionMenu.patch("/:id", handleUpdateFunctionMenu);

export default FunctionMenu;
