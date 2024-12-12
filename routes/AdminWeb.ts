import {
  handleCreateAdmin,
  handleGetAdminById,
  handleGetAllAdmin,
  handleGetPermission,
  handleGetRole,
  handleLoginAdmin,
  handleReqResetPassword,
  handleResetPassword,
  handleVerifyResetPassword,
  refreshAccessToken,
} from "#dep/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/get-token", refreshAccessToken);
AdminWeb.post("/reset-pass/req", handleReqResetPassword);
AdminWeb.post("/reset-pass/verify", handleVerifyResetPassword);
AdminWeb.patch("/reset-pass/reset", handleResetPassword);

AdminWeb.post("/", handleCreateAdmin);
AdminWeb.post("/login", handleLoginAdmin);
AdminWeb.get("/", handleGetAllAdmin);
AdminWeb.get("/role", handleGetRole);
AdminWeb.get("/permission", handleGetPermission);
AdminWeb.get("/:id", handleGetAdminById);

export default AdminWeb;
