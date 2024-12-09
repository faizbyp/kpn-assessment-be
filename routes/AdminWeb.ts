import {
  handleGetAllAdmin,
  handleLoginAdmin,
  refreshAccessToken,
} from "#dep/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/login", handleLoginAdmin);
AdminWeb.post("/get-token", refreshAccessToken);
AdminWeb.get("/", handleGetAllAdmin);

export default AdminWeb;
