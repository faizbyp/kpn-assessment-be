import {
  handleCreateAdmin,
  handleGetAllAdmin,
  handleGetRole,
  handleLoginAdmin,
  handleReqResetPassword,
  handleResetPassword,
  handleVerifyResetPassword,
  refreshAccessToken,
} from "#dep/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/", handleCreateAdmin);
AdminWeb.post("/login", handleLoginAdmin);
AdminWeb.post("/get-token", refreshAccessToken);
AdminWeb.post("/reset-pass/req", handleReqResetPassword);
AdminWeb.post("/reset-pass/verify", handleVerifyResetPassword);
AdminWeb.patch("/reset-pass/reset", handleResetPassword);
AdminWeb.get("/", handleGetAllAdmin);
AdminWeb.get("/role", handleGetRole);

export default AdminWeb;
