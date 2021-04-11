import { model, Schema, Model, Document } from 'mongoose'
import { Freight } from './freight-schema'
import { Vehicle } from './vehicle-schema'

interface IDriver extends Document {}

const DriverSchema: Schema = new Schema({
  vehicle: Vehicle,
  freight: [Freight],
  cnh: {
    type: String,
    required: true
  }
})

export const Driver: Model<IDriver> = model('Driver', DriverSchema)
