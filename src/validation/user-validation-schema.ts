import { User } from '@/domain/entities/user'
import Joi, { ObjectSchema } from 'joi'

export const UserValidatorSchema: ObjectSchema<User> = Joi.object({
  address: Joi.any(),
  driver: Joi.any(),
  company: Joi.any(),
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
    .min(13)
    .max(14)
    .required(),
  type: Joi.string()
    .required()
})
