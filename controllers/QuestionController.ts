import { QuestionFields, QuestionRequest } from "#dep/types/MasterDataTypes";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import * as formidable from "formidable";
import { createQuestion } from "#dep/models/QuestionModel";

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
