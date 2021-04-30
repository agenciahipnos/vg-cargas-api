import { DriverModel } from '@/domain/models/driver-model'
import { model, Schema, Model, Document } from 'mongoose'

interface IDriver extends Document, Omit<DriverModel, '_id'> {}

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

export const DriverMongo: Model<IDriver> = model('Driver', DriverSchema)
