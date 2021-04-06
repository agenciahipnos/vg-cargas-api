import { Address } from './address'
import { Freight } from './freight'
import { User } from './user'

export interface Company {
  user: User
  freight: Freight[]
  address: Address
  name: string
  cnpj: string
  departament: string
  phone: string
}
