import { FreightModel } from './freight-model'
import { VehicleModel } from './vehicle-model'

export interface DriverModel {
  id: string
  vehicle: VehicleModel
  freight: FreightModel[]
  cnh: string
}
