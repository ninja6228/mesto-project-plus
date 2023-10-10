import { Request, Response } from 'express';
import User from '../models/user';

const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => {
      if (!users) {
        res.status(400).send('Переданы некорректные данные при создании пользователя');
      } else {
        res.status(200).send(users);
      }
    })
    .catch(() => res.status(500).send('На сервере произошла ошибка'));
};

const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send('Запрашиваемый пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(() => res.status(500).send('На сервере произошла ошибка'));
};

const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send('На сервере произошла ошибка'));
};

const updateUserAvatar = (req: any, res: any) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send('Запрашиваемый пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => res.status(500).send('На сервере произошла ошибка'));
};

const updateUserInfo = (req: any, res: any) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send('Запрашиваемый пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => res.status(500).send('На сервере произошла ошибка'));
};

export {
  createUser,
  getUser,
  getAllUsers,
  updateUserAvatar,
  updateUserInfo,
};
