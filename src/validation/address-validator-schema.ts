import { Address } from '@/domain/entities/address'
import Joi, { ObjectSchema } from 'joi'

export const AddressValidatorSchema: ObjectSchema<Address> = Joi.object({
  cep: Joi.string()
    .length(9)
    .required(),
  state: Joi.string()
    .length(2)
    .required(),
  city: Joi.string()
    .required(),
  neighborhood: Joi.string()
    .required(),
  street: Joi.string()
    .required(),
  number: Joi.string()
    .required(),
  observations: Joi.string()
})
