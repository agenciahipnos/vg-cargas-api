import { model, Schema, Model, Document } from 'mongoose'

interface IUser extends Document {}

export const UserSchema: Schema = new Schema({
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
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

export const User: Model<IUser> = model('User', UserSchema)
