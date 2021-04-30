import { Validator, ValidatorReturn } from '../protocols/validator'

export class ValidatorClass implements Validator {
  validate (input: any): ValidatorReturn {
    return null
  }
}
