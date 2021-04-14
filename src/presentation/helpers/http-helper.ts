import { NotFoundError } from '@/infra/errors/not-found-error'
import { ServerError } from '../errors/server-error'
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

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    code: 500,
    error: new ServerError(error.stack).message
  },
  error: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: {
    code: 403,
    error: error.message
  }
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 201,
  body: {
    code: 201,
    success: data
  }
})

export const notFound = (error: NotFoundError): HttpResponse => ({
  statusCode: 404,
  body: {
    code: error.getCode(),
    message: error.message
  }
})
