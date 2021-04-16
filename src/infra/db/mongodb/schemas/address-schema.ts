import { model, Schema, Model, Document } from 'mongoose'

interface IAddress extends Document {}

export const AddressSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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

export const Address: Model<IAddress> = model('Address', AddressSchema)
