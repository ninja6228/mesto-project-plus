import express from 'express';
import { celebrate } from 'celebrate';
import { createUser, login } from '../controllers/user';
import { validateLoginUser, validateCreateUser } from '../utils/validate';
import users from './user';
import cards from './card';
import auth from '../middlewares/auth';
import { NotFoundError } from '../errors/index';

const routes = express();

routes.use(express.json());

routes.post('/signin', celebrate(validateLoginUser), login);
routes.post('/signup', celebrate(validateCreateUser), createUser);
routes.use('/users', auth, users);
routes.use('/cards', auth, cards);

routes.all('*', (req, res, next) => {
  next(new NotFoundError('такого адреса нету'));
});

export default routes;
