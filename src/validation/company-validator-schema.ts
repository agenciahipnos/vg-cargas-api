import { Company } from '@/domain/entities/company'
import Joi, { ObjectSchema } from 'joi'

export const CompanyValidatorSchema: ObjectSchema<Company> = Joi.object({
  address: Joi.array()
    .required(),
  name: Joi.string()
    .required(),
  cnpj: Joi.string()
    .required(),
  departament: Joi.string()
    .required(),
  phone: Joi.string()
    .min(14)
    .max(15)
    .required()
})
