import { Validator, ValidatorReturn } from '../protocols/validator'

export const mockValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): ValidatorReturn {
      return null
    }
  }
  return new ValidatorStub()
}
