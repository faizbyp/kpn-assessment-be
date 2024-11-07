import { createSeries, deleteSeries, getSeries, updateSeries } from "#dep/models/SeriesModel";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const handleCreateSeries = async (req: Request, res: Response) => {
  const payload = {
    id: uuidv4(),
    series_name: req.body.series_name,
    is_active: req.body.is_active,
    created_date: new Date(),
  };

  try {
    let result = await createSeries(payload);
    res.status(200).send({
      message: `Success create series`,
      series_name: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetSeries = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    let result = await getSeries();
    res.status(200).send({
      message: `Success get series`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleDeleteSeries = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let result = await deleteSeries(id);
    res.status(200).send({
      message: `Success delete series`,
      id: id,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleUpdateSeries = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    let result = await updateSeries(payload, id);
    res.status(200).send({
      message: `Success update series`,
      series_name: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
