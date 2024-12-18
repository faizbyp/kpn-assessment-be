import {
  handleCreateSeries,
  handleDeleteSeries,
  handleGetSeries,
  handleUpdateSeries,
} from "#dep/controllers/SeriesController";
import { checkPermission } from "#dep/middleware/auth";
import { Router } from "express";
const Series = Router();

Series.post("/", checkPermission("fcreate", 4), handleCreateSeries);
Series.get("/", checkPermission("fread", 4), handleGetSeries);
Series.delete("/:id", checkPermission("fdelete", 4), handleDeleteSeries);
Series.patch("/:id", checkPermission("fupdate", 4), handleUpdateSeries);

export default Series;
