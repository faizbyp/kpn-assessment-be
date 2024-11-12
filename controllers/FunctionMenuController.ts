import {
  createFunctionMenu,
  deleteFunctionMenu,
  getFunctionMenu,
  updateFunctionMenu,
} from "#dep/models/FunctionMenuModel";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const handleGetFunctionMenu = async (_req: Request, res: Response) => {
  try {
    let result = await getFunctionMenu();
    res.status(200).send({
      message: `Success get function menu`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleCreateFunctionMenu = async (req: Request, res: Response) => {
  const today = new Date();
  const payload = {
    id: uuidv4(),
    fm_code: req.body.fm_code,
    fm_name: req.body.fm_name,
    is_active: req.body.is_active,
    created_by: req.body.id_user,
    created_date: today,
  };

  try {
    let result = await createFunctionMenu(payload);
    res.status(200).send({
      message: `Success create function menu`,
      fm_code: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleDeleteFunctionMenu = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let result = await deleteFunctionMenu(id);
    res.status(200).send({
      message: `Success delete function menu`,
      id: id,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleUpdateFunctionMenu = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    let result = await updateFunctionMenu(payload, id);
    res.status(200).send({
      message: `Success update function menu`,
      fm_code: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
