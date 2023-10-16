import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createCard,
  getCards,
  deleteCard,
  addLikes,
  removeLikes,
} from '../controllers/card';
import { validateDataCard, validateParamsCard } from '../utils/validate';

const cards = Router();

cards.get('/', getCards);
cards.post('/', celebrate(validateDataCard), createCard);
cards.delete('/:cardId', celebrate(validateParamsCard), deleteCard);
cards.put('/:cardId/likes', celebrate(validateParamsCard), addLikes);
cards.delete('/:cardId/likes', celebrate(validateParamsCard), removeLikes);

export default cards;
