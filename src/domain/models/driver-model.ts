import { VehicleModel } from './vehicle-model'

export interface DriverModel {
  id: string
  vehicle: VehicleModel
  cnh: string
}
