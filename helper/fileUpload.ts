import path from "path";
import fs from "fs";
import formidable, { Options } from "formidable";
import { IncomingMessage } from "http";

interface FormDataResult {
  fields: Record<string, any>;
  files: Record<string, any>;
}

export const parseFormUpload = async (formData: IncomingMessage, options: Options) => {
  const form = new formidable.IncomingForm({
    uploadDir: options.uploadDir
      ? path.join(__dirname, `../uploads${options.uploadDir}`)
      : path.join(__dirname, "../uploads"),
    keepExtensions: true,
    maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10 MB by default
    multiples: options.multiples || false,
  });

  try {
    const { fields, files } = await new Promise<FormDataResult>((resolve, reject) => {
      form.parse(formData, (error, fields, files) => {
        if (error) {
          return reject(error);
        }
        resolve({ fields, files });
      });
    });

    const payload = JSON.parse(fields.data);
    const file = files.file;

    if (!file) {
      throw new Error("No file uploaded");
    }

    const oldFilePath = file[0].filepath;
    const extension = path.extname(file[0].originalFilename);
    const newFilename = `${Date.now()}_${payload.invoice_num}${extension}`;
    const newFilePath = path.join(options.uploadDir ? options.uploadDir : "", newFilename);

    await fs.promises.rename(oldFilePath, newFilePath);

    return { payload, filename: newFilename };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
