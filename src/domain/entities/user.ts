import { AddressModel } from '../models/address-model'
import { CompanyModel } from '../models/company-model'
import { DriverModel } from '../models/driver-model'

export interface User {
  address: AddressModel[]
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
