import { handleLoginAdmin } from "@/controllers/AdminWebController";
import { Router } from "express";
const AdminWeb = Router();

AdminWeb.post("/login", handleLoginAdmin);

export default AdminWeb;
