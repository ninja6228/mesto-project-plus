import { Joi } from 'celebrate';

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const validateDataCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRegex),
  }),
};

const validateParamsCard = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

const validateParamsUser = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

const validateDataUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
};

const validateAvatarUser = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkRegex),
  }),
};

const validateLoginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const validateCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(linkRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export {
  validateParamsCard,
  validateDataCard,
  validateParamsUser,
  validateDataUser,
  validateAvatarUser,
  validateLoginUser,
  validateCreateUser,
};
