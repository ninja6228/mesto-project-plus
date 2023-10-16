import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getUser,
  getAllUsers,
  authorizedUser,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/user';
import {
  validateParamsUser,
  validateDataUser,
  validateAvatarUser,
} from '../utils/validate';

const user = Router();

user.get('/', getAllUsers);
user.get('/me', authorizedUser);
user.get('/:userId', celebrate(validateParamsUser), getUser);
user.patch('/me', celebrate(validateDataUser), updateUserInfo);
user.patch('/me/avatar', celebrate(validateAvatarUser), updateUserAvatar);

export default user;
