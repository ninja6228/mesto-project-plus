import { Router } from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/user';

const user = Router();

user.get('/', getAllUsers);
user.get('/:userId', getUser);
user.post('/', createUser);
user.patch('/me', updateUserInfo);
user.patch('/me/avatar', updateUserAvatar);

export default user;
