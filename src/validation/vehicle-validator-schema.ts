import { Vehicle } from '@/domain/entities/vehicle'
import Joi, { ObjectSchema } from 'joi'

export const VehicleValidatorSchema: ObjectSchema<Vehicle> = Joi.object({
  modelo: Joi.string()
    .required(),
  marca: Joi.string()
    .required(),
  ano: Joi.string()
    .length(4)
    .required(),
  capacidade_maxima: Joi.string()
    .required(),
  categoria_veiculo: Joi.string()
    .required(),
  placa: Joi.string()
    .required(),
  carroceria: Joi.string()
    .required(),
  antt: Joi.string()
    .required(),
  seguro: Joi.boolean()
    .required(),
  rastreador: Joi.boolean()
    .required()
})
