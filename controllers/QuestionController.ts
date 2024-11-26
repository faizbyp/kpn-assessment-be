import { QuestionFields, QuestionRequest, QuestionResult } from "#dep/types/MasterDataTypes";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import * as formidable from "formidable";
import { createQuestion, getQuestion, getQuestionById } from "#dep/models/QuestionModel";

export const handleCreateQuestion = async (req: Request, res: Response): Promise<any> => {
  const id = uuidv4();
  const dir = path.join(__dirname, `../uploads/question/${id}`);
  const today = new Date();
  const form = new formidable.IncomingForm({
    uploadDir: dir,
    keepExtensions: true,
    multiples: true,
  });

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    form.parse(req, async (error, fields, files) => {
      if (error) {
        throw new Error("Form parse error");
      }

      const answers: any[] = [];
      for (let key in fields) {
        const match = key.match(/^answer\[(\d+)\]\[(.+)\]$/);
        if (match) {
          const index = parseInt(match[1], 10);
          const fieldName = match[2];

          answers[index] = answers[index] || {};
          answers[index][fieldName] = fields[key] ? fields[key][0] : undefined;
        }
      }

      for (let key in files) {
        const match = key.match(/^answer\[(\d+)\]\[image\]$/);
        if (match && files[key]) {
          const index = parseInt(match[1], 10);
          const oldFilePath = files[key][0].filepath;
          const originalFilename = files[key][0].originalFilename || "default_filename";
          const extension = path.extname(originalFilename);
          const newFilename = `answer_${String.fromCharCode(97 + index)}_${Date.now()}${extension}`;
          const newFilePath = path.join(dir, newFilename);

          answers[index] = answers[index] || {};
          answers[index].image = id + "/" + newFilename;
          await fs.promises.rename(oldFilePath, newFilePath);
        }
      }

      const QAFields = {
        q_seq: fields.q_seq ? fields.q_seq[0] : undefined,
        q_layout_type: fields.q_layout_type ? fields.q_layout_type[0] : undefined,
        q_input_text: fields.q_input_text ? fields.q_input_text[0] : undefined,
        q_input_image_url: files.q_input_image
          ? id + "/" + files.q_input_image[0].newFilename
          : undefined,
        answer_type: fields.answer_type ? fields.answer_type[0] : undefined,
      };

      const answersPayload: any = {};
      answers.forEach((answer, index) => {
        const letter = String.fromCharCode(97 + index);
        if (answer.text) {
          answersPayload[`answer_choice_${letter}_text`] = answer.text;
        }
        if (answer.image) {
          answersPayload[`answer_choice_${letter}_image_url`] = answer.image;
        }
        answersPayload[`key_answer_point_${letter}`] = answer.point;
      });

      // console.log(QAFields);
      // console.log(answers);

      const payload = {
        id,
        ...QAFields,
        ...answersPayload,
        created_by: fields.created_by ? fields.created_by[0] : undefined,
        created_date: today,
      };
      console.log(payload);
      const result = await createQuestion(payload);

      return res.status(200).send({
        message: `Success create question`,
        id: result,
      });
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetQuestion = async (_req: Request, res: Response) => {
  try {
    let result = await getQuestion();
    res.status(200).send({
      message: `Success get question`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetQuestionById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await getQuestionById(id);
    const formattedResult: QuestionResult = {
      id: result.id,
      answer_type: result.answer_type,
      created_by: result.created_by,
      created_date: result.created_date,
      updated_by: result.updated_by,
      updated_date: result.updated_date,
      question: {
        seq: result.q_seq,
        layout_type: result.q_layout_type,
        input_text: result.q_input_text,
        input_image_url: result.q_input_image_url,
      },
      answers: [],
    };

    ["a", "b", "c", "d", "e"].forEach((choice) => {
      const textKey = `answer_choice_${choice}_text`;
      const imageKey = `answer_choice_${choice}_image_url`;
      const pointKey = `key_answer_point_${choice}`;

      if (result[pointKey]) {
        formattedResult.answers.push({
          text: result[textKey],
          image_url: result[imageKey],
          point: result[pointKey],
        });
      }
    });

    res.status(200).send({
      message: `Success get question: ${id}`,
      data: formattedResult,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
