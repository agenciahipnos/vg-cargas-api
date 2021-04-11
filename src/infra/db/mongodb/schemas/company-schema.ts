import { model, Schema, Model, Document } from 'mongoose'
import { AddressSchema } from './address-schema'
import { FreightSchema } from './freight-schema'

interface ICompany extends Document {}

export const CompanySchema: Schema = new Schema({
  address: {
    type: [AddressSchema]
  },
  freight: {
    type: [FreightSchema]
  },
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  departament: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

export const Company: Model<ICompany> = model('Company', CompanySchema)
