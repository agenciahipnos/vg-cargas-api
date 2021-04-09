import { ValidatorReturn } from '../protocols/validator'

export const mockValidatorResultBadRequest = (): ValidatorReturn => ({
  messages: [
    {
      field: 'email',
      error: 'any_error'
    }
  ]
})
