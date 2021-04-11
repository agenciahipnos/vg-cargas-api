import { model, Schema, Model, Document } from 'mongoose'
import { FreightSchema } from './freight-schema'
import { VehicleSchema } from './vehicle-schema'

interface IDriver extends Document {}

export const DriverSchema: Schema = new Schema({
  freight: {
    type: [FreightSchema]
  },
  vehicle: {
    type: VehicleSchema
  },
  cnh: {
    type: String,
    required: true
  }
})

export const Driver: Model<IDriver> = model('Driver', DriverSchema)
