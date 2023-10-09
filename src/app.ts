import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import users from './routes/user';
import cards from './routes/card';

const app = express();

const { PORT = 3000 } = process.env;
const DataBaseUrl = 'mongodb://127.0.0.1:27017/mestodb';
const testId = '6523bf6d96a05c6bb4690bab';

mongoose.connect(DataBaseUrl)
  .then(() => console.log(`Подключение к базе ${DataBaseUrl}`))
  .catch((err) => {
    console.log('Ошибка подключения');
    console.error(err);
  });

app.use(express.json());

app.use((req: any, res: Response, next: NextFunction) => {
  const userId = testId;
  req.user = {
    _id: userId,
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT, () => {
  console.log(`Запушен порт: ${PORT}`);
});
