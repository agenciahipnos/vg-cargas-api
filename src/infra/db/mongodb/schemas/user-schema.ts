import { model, Schema, Model, Document } from 'mongoose'
import { UserModel } from '@/domain/models/user-model'
import { Address } from './address-schema'

interface IUser extends Document, Omit<UserModel, 'id'> {}

const UserSchema: Schema = new Schema({
  address: [Address],
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

export const User: Model<IUser> = model('User', UserSchema)
