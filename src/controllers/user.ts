import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import IRequest from '../utils/types/index';
import {
  NotFoundError,
  Unauthorized,
  Conflict,
  BadRequst,
} from '../errors/index';

const SALT_ROUNDS = 10;

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((users) => {
      const { password: _, ...user } = users.toObject();
      res.status(201).send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict('Пользователь с таким Email уже есть'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequst('Переданы некорректные данные при регистрации'));
      } else {
        next(error);
      }
    });
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const authorizedUser = (req: IRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const updateUserAvatar = (req: IRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.status(201).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequst('переданы некорректные данные при обновлении аватарки'));
      } else {
        next(error);
      }
    });
};

const updateUserInfo = (req: IRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.status(201).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequst('переданы некорректные данные при обновлении пользователя'));
      } else {
        next(error);
      }
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      } else {
        res.send({
          token: jwt.sign({ _id: user._id }, 'secretKey', { expiresIn: '7d' }),
        });
      }
    })
    .catch(next);
};

export {
  createUser,
  getUser,
  authorizedUser,
  getAllUsers,
  updateUserAvatar,
  updateUserInfo,
  login,
};
