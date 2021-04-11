import { model, Schema, Model, Document } from 'mongoose'

interface IVehicle extends Document {}

export const VehicleSchema: Schema = new Schema({
  modelo: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  ano: {
    type: String,
    required: true
  },
  capacidade_maxima: {
    type: String,
    required: true
  },
  categoria_veiculo: {
    type: String,
    required: true
  },
  placa: {
    type: String,
    required: true
  },
  carroceria: {
    type: String,
    required: true
  },
  antt: {
    type: String,
    required: true
  },
  seguro: {
    type: Boolean,
    required: true
  },
  rastreador: {
    type: Boolean,
    required: true
  }
})

export const Vehicle: Model<IVehicle> = model('Vehicle', VehicleSchema)
