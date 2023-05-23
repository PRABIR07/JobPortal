import { NextFunction, Request, Response } from "express";

interface DefaultErrors {
  statusCode: number;
  message: any;
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const defaultErrors: DefaultErrors = {
    statusCode: 500,
    message: err,
  };

  // missing filed error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;

    defaultErrors.message = Object.values(err.errors)
      .map((item: any) => item.properties.message)

      .join(",");
  }
  // duplicate field error
     if (err.code && err.code === 11000) {
       defaultErrors.statusCode = 400;
       defaultErrors.message = `${Object.keys(
         err.keyValue
       )} field has to be unique`;
     }

  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};
