import { User } from '@/domain/entities/user'
import Joi, { ObjectSchema } from 'joi'

export const UserValidatorSchema: ObjectSchema<User> = Joi.object({
  address: Joi.array()
    .required(),
  driver: Joi.object(),
  company: Joi.object(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required(),
  name: Joi.string()
    .required(),
  cpf: Joi.string()
    .pattern(new RegExp('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'))
    .required(),
  birthdate: Joi.date()
    .required(),
  phone: Joi.string()
    .min(14)
    .max(15)
    .required(),
  type: Joi.string()
    .required()
})
