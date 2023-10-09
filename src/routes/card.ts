import { Router } from 'express';
import {
  createCard,
  getCards,
  deleteCard,
  addLikes,
  removeLikes,
} from '../controllers/card';

const cards = Router();

cards.post('/', createCard);
cards.get('/', getCards);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', addLikes);
cards.delete('/:cardId/likes', removeLikes);

export default cards;
