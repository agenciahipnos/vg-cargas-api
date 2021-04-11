import { Address } from './address'
import { Freight } from './freight'

export interface Company {
  address: Address[]
  freight: Freight[]
  name: string
  cnpj: string
  departament: string
  phone: string
}
