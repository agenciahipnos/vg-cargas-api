import { Driver } from '@/domain/entities/driver'
import Joi, { ObjectSchema } from 'joi'

export const DriverValidationSchema: ObjectSchema<Driver> = Joi.object({
  vehicle: Joi.object()
    .required(),
  cnh: Joi.string()
    .length(11)
})
