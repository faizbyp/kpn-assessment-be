import {
  handleCreateFunctionMenu,
  handleDeleteFunctionMenu,
  handleGetFunctionMenu,
  handleUpdateFunctionMenu,
} from "#dep/controllers/FunctionMenuController";
import { checkPermission } from "#dep/middleware/auth";
import { Router } from "express";
const FunctionMenu = Router();

FunctionMenu.get("/", checkPermission("fread", 6), handleGetFunctionMenu);
FunctionMenu.post("/", checkPermission("fcreate", 6), handleCreateFunctionMenu);
FunctionMenu.delete("/:id", checkPermission("fdelete", 6), handleDeleteFunctionMenu);
FunctionMenu.patch("/:id", checkPermission("fupdate", 6), handleUpdateFunctionMenu);

export default FunctionMenu;
