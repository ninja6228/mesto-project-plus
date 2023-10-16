import { Request, Response } from 'express';

interface IErr {
  statusCode: number,
  message: string
}

const errorMiddleware = (err: IErr, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;
  const textMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;
  res.status(statusCode).send({ message: textMessage });
};

export default errorMiddleware;
