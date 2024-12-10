import {
  handleCreateAdmin,
  handleGetAllAdmin,
  handleGetRole,
  handleLoginAdmin,
  refreshAccessToken,
} from "#dep/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/", handleCreateAdmin);
AdminWeb.post("/login", handleLoginAdmin);
AdminWeb.post("/get-token", refreshAccessToken);
AdminWeb.get("/", handleGetAllAdmin);
AdminWeb.get("/role", handleGetRole);

export default AdminWeb;
