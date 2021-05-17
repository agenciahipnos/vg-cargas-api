import { UserModel } from '@/domain/models/user-model'
import { model, Schema, Model, Document } from 'mongoose'
import { AddressSchema } from './address-schema'

interface IUser extends Document, Omit<UserModel, '_id'> {}

export const UserSchema: Schema = new Schema({
  address: {
    type: [AddressSchema],
    default: []
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
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

export const UserMongo: Model<IUser> = model('User', UserSchema)
