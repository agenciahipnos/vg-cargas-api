import { FreightModel } from './freight-model'
import { VehicleModel } from './vehicle-model'

export interface DriverModel {
  _id: string
  vehicle: VehicleModel
  freight: FreightModel[]
  cnh: string
}
