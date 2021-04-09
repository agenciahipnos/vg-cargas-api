import { HttpResponse } from '../protocols/http'
import { ValidatorReturn } from '../protocols/validator'

export const badRequestValidation = (error: ValidatorReturn): HttpResponse => {
  const response: HttpResponse = {
    statusCode: 400,
    body: {
      code: 400,
      errors: error.messages
    }
  }
  return response
}
