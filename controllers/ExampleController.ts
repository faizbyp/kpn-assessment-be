import { Request, Response } from "express";

const ExampleController = {
  exampleMethod: (req: Request, res: Response) => {
    res.status(200).send({
      message: "This is an example",
    });
  },
};

export default ExampleController;
