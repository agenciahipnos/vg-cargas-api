import { model, Schema, Model, Document } from 'mongoose'
import { AddressModel } from '@/domain/models/address-model'

interface IAddress extends Document, Omit<AddressModel, 'id'> {}

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
