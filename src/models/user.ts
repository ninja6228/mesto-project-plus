import {
  model,
  Model,
  Schema,
  Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { Unauthorized } from '../errors/index';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => validator.isURL(value),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(email: string, password: string) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
    }
    return user;
  },
);

export default model<IUser, UserModel>('user', UserSchema);
