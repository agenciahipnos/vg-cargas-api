import { AddressModel } from './address-model'
import { FreightModel } from './freight-model'

export interface CompanyModel {
  _id?: string
  address: AddressModel[]
  freight: FreightModel[]
  name: string
  cnpj: string
  departament: string
  phone: string
}
