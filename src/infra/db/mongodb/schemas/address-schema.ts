import { model, Schema, Model, Document } from 'mongoose'

interface IAddress extends Document {}

const AddressSchema: Schema = new Schema({
  cep: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  observations: {
    type: String,
    required: false
  }
})

export const Address: Model<IAddress> = model('Address', AddressSchema)
