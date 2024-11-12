import { createCriteria, deleteCriteria, getCriteria } from "#dep/models/CriteriaModel";
import { CriteriaGroup, CriteriaRequest } from "#dep/types/CriteriaTypes";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const handleCreateCriteria = async (req: Request, res: Response) => {
  const payload = req.body;
  const today = new Date();
  const groupId = uuidv4();
  const creator = payload.id_user;

  const groupPayload: CriteriaGroup = {
    id: groupId,
    value_code: payload.category_code,
    value_name: payload.category_name,
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
