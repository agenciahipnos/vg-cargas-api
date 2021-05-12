import { ValidationResult } from 'joi'
import { Validator } from '../protocols/validator'

export class ValidatorClass implements Validator {
  validate (input: any): ValidationResult {
    return null
  }
}
