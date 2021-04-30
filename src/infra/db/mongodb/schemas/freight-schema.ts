import { FreightModel } from '@/domain/models/freight-model'
import { model, Schema, Model, Document } from 'mongoose'

interface IFreight extends Document, Omit<FreightModel, '_id'> {}

export const FreightSchema: Schema = new Schema({
  available: {
    type: Boolean,
    default: true
  },
  origin_city: {
    type: String,
    required: true
  },
  origin_state: {
    type: String,
    required: true
  },
  formated_price: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  formated_fee: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  vehicle_type: {
    type: String,
    required: true
  },
  bodywork: {
    type: String,
    required: true
  },
  load_type: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
})

export const FreightMongo: Model<IFreight> = model('Freight', FreightSchema)
