import { model, Schema, Model, Document } from 'mongoose'
import { AddressSchema } from './address-schema'
import { DriverSchema } from './driver-schema'
import { CompanySchema } from './company-schema'

interface IUser extends Document {}

export const UserSchema: Schema = new Schema({
  address: {
    type: [AddressSchema]
  },
  driver: {
    type: DriverSchema
  },
  company: {
    type: CompanySchema
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
