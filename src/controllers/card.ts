import { Request, Response } from 'express';
import Cards from '../models/card';

const createCard = (req: any, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Cards.create({ name, link, owner: userId })
    .then((card) => {
      if (!card) {
        res.status(400).send('Переданы некорректные данные при создании карточки');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => res.status(500).send(`Произошла ошибка: ${err}`));
};

const getCards = (req: Request, res: Response) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send(`Произошла ошибка: ${err}`));
};

const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send('Карточка с указанным ID не найдена');
      } else {
        Cards.findByIdAndDelete(req.params.cardId)
          .then(() => res.status(200).send('Карточка успешна удалена'))
          .catch((err) => res.status(500).send(`Произошла ошибка при удалении карточки: ${err}`));
      }
    })
    .catch((err) => res.status(500).send(`Произошла ошибка при поиске карточки: ${err}`));
};

const addLikes = (req: any, res: Response) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(400).send('Переданы некорректные данные для потавки лайка');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

const removeLikes = (req: any, res: Response) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(400).send('Переданы некорректные данные для снятии лайка');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => res.status(500).send(`Ошибка: ${err}`));
};

export {
  createCard,
  getCards,
  deleteCard,
  addLikes,
  removeLikes,
};
