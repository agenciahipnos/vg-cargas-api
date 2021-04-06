import { AddressModel } from './address-model'
import { CompanyModel } from './company-model'
import { DriverModel } from './driver-model'

export interface UserModel {
  id: string
  address: AddressModel
  driver: DriverModel
  company: CompanyModel
  email: string
  password: string
  name: string
  cpf: string
  birthdate: string
  phone: string
  type: string
}
