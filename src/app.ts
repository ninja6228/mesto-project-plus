import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { DataBaseUrl, PORT } from './utils/config';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

mongoose.connect(DataBaseUrl)
  .then(() => console.log(`Подключение к базе ${DataBaseUrl}`))
  .catch((err) => {
    console.log('Ошибка подключения');
    console.error(err);
  });

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Запушен порт: ${PORT}`);
});
