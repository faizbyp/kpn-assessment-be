import {
  createCriteria,
  deleteCriteria,
  getCriteria,
  updateCriteria,
} from "#dep/models/CriteriaModel";
import { Criteria, CriteriaGroup, CriteriaRequest } from "#dep/types/MasterDataTypes";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const handleCreateCriteria = async (req: Request, res: Response) => {
  const payload = req.body;
  const today = new Date();
  const groupId = uuidv4();
  const creator = payload.created_by;

  const groupPayload: CriteriaGroup = {
    id: groupId,
    value_code: payload.value_code,
    value_name: payload.value_name,
    created_by: creator,
    created_date: today,
    value_group: "CRITERIA",
  };

  const criteriaPayload = payload.criteria.map((prev: CriteriaRequest) => ({
    ...prev,
    id: uuidv4(),
    category_fk: groupId,
    created_by: creator,
    created_date: today,
  }));

  try {
    let result = await createCriteria(groupPayload, criteriaPayload);
    res.status(200).send({
      message: `Success create criteria`,
      category_name: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetCriteria = async (_req: Request, res: Response) => {
  try {
    const result = await getCriteria();
    const newResult = Object.values(
      result.reduce((acc, item) => {
        const { value_code, value_name, value_id, ...criteria } = item;

        if (!acc[value_code]) {
          acc[value_code] = {
            value_code,
            value_name,
            value_id,
            criteria: [],
          };
        }

        acc[value_code].criteria.push(criteria);
        return acc;
      }, {})
    );

    res.status(200).send({
      message: `Success get criteria`,
      data: newResult,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleDeleteCriteria = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let result = await deleteCriteria(id);
    res.status(200).send({
      message: `Success delete criteria`,
      name: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleUpdateCriteria = async (req: Request, res: Response) => {
  const today = new Date();
  const id = req.params.id;
  const payload = req.body;
  const criteria = payload.criteria.map((prev: Partial<Criteria>) => {
    if (!prev.hasOwnProperty("id") || !prev.hasOwnProperty("category_fk")) {
      return {
        id: uuidv4(),
        category_fk: id,
        ...prev,
        created_by: payload.user_id,
        created_date: today,
        updated_by: payload.user_id,
        updated_date: today,
      };
    }
    return { ...prev, updated_by: payload.user_id, updated_date: today };
  });

  delete payload.user_id;
  delete payload.criteria;

  try {
    let result = await updateCriteria(payload, criteria, id);
    res.status(200).send({
      message: `Success update criteria`,
      value_name: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
