import { model, Schema, Model, Document } from 'mongoose'

interface IDriver extends Document {}

export const DriverSchema: Schema = new Schema({
  freight: {
    type: Schema.Types.ObjectId,
    ref: 'Freight'
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  cnh: {
    type: String,
    required: true
  }
})

export const Driver: Model<IDriver> = model('Driver', DriverSchema)
