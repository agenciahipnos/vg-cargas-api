import { ValidationResult } from 'joi'
import { Validator } from '../protocols/validator'

export const mockValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): ValidationResult {
      return null
    }
  }
  return new ValidatorStub()
}
