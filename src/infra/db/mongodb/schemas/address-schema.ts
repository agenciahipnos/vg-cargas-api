import { AddressModel } from '@/domain/models/address-model'
import { model, Schema, Model, Document } from 'mongoose'

interface IAddress extends Document, Omit<AddressModel, '_id'> {}

export const AddressSchema: Schema = new Schema({
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
    type: String,
    required: true
  },
  observations: {
    type: String,
    required: false
  }
})

export const AddressMongo: Model<IAddress> = model('Address', AddressSchema)
