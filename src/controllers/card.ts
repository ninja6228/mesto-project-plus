import { NextFunction, Request, Response } from 'express';
import Cards from '../models/card';
import { NotFoundError, BadRequst, Forbidden } from '../errors/index';
import IRequest from '../utils/types/index';

const createCard = (req: IRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const userId = req.user?._id;
  Cards.create({ name, link, owner: userId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.status(201).send(card);
      }
    })
    .catch(next);
};

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req: IRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным ID не найдена');
      } else {
        const ownerId = card.owner.toString();
        const userId = req.user?._id;
        if (ownerId === userId) {
          Cards.findByIdAndDelete(req.params.cardId)
            .then(() => res.status(200).send('Карточка успешна удалена'))
            .catch(next);
        } else {
          throw new Forbidden('Это не ваша карточка');
        }
      }
    })
    .catch(next);
};

const addLikes = (req: IRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new BadRequst('Переданы некорректные данные для постановки лайка');
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

const removeLikes = (req: IRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new BadRequst('Переданы некорректные данные для снятии лайка');
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

export {
  createCard,
  getCards,
  deleteCard,
  addLikes,
  removeLikes,
};
