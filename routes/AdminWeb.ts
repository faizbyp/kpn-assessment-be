import { handleLoginAdmin } from "#dep/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/login", handleLoginAdmin);

export default AdminWeb;
