import { CompanyModel } from '@/domain/models/company-model'
import { model, Schema, Model, Document } from 'mongoose'
import { Address } from './address-schema'
import { Freight } from './freight-schema'
import { User } from './user-schema'

interface ICompany extends Document, Omit<CompanyModel, 'id'> {}

const CompanySchema: Schema = new Schema({
  user: [User],
  address: [Address],
  freight: [Freight],
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
