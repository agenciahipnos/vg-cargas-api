import { CompanyModel } from '@/domain/models/company-model'
import { model, Schema, Model, Document } from 'mongoose'
import { AddressSchema } from './address-schema'

interface ICompany extends Document, Omit<CompanyModel, '_id'> {}

export const CompanySchema: Schema = new Schema({
  address: {
    type: [AddressSchema],
    default: []
  },
  freight: {
    type: Schema.Types.ObjectId,
    ref: 'Freight'
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

export const CompanyMongo: Model<ICompany> = model('Company', CompanySchema)
