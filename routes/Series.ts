import {
  handleCreateSeries,
  handleDeleteSeries,
  handleGetSeries,
  handleUpdateSeries,
} from "#dep/controllers/SeriesController";
import { Router } from "express";
const Series = Router();

Series.post("/", handleCreateSeries);
Series.get("/", handleGetSeries);
Series.delete("/:id", handleDeleteSeries);
Series.patch("/:id", handleUpdateSeries);

export default Series;
