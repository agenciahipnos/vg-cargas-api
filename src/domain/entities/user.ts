import { Address } from './address'
import { Company } from './company'
import { Driver } from './driver'

export interface User {
  address: Address
  driver: Driver
  company: Company
  email: string
  password: string
  name: string
  cpf: string
  birthdate: string
  phone: string
  type: string
}
