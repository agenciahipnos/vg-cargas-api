import { AddressModel } from './address-model'

export interface CompanyModel {
  id: string
  address: AddressModel[]
  name: string
  cnpj: string
  departament: string
  phone: string
}
