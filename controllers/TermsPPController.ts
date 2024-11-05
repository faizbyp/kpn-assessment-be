import { getTermsPP, updateTermsPP } from "@/models/TermsPPModel";
import { Request, Response } from "express";

const TERMS_ID = "d1d3d3bd-f06c-4dca-90fb-7ef043c6508b";
const PP_ID = "2b2818b2-e5cd-4d67-a024-9a597b5e3132";

export const handleGetTermsPP = async (_req: Request, res: Response) => {
  let data = { terms: "", pp: "" };

  try {
    let result = await getTermsPP();
    result.forEach((row) => {
      if (row.id === TERMS_ID) {
        data.terms = row;
      }
      if (row.id === PP_ID) {
        data.pp = row;
      }
    });
    res.status(200).send({
      message: `Success get terms & PP`,
      data: data,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleUpdateTerms = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    let result = await updateTermsPP(payload, TERMS_ID);
    res.status(200).send({
      message: `Success update terms`,
      id: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleUpdatePP = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    let result = await updateTermsPP(payload, PP_ID);
    res.status(200).send({
      message: `Success update privacy policy`,
      id: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
