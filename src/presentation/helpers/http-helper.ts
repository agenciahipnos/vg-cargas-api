import { NotFoundError } from '@/infra/errors/not-found-error'
import { ValidationResult } from 'joi'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  const response: HttpResponse = {
    statusCode: 400,
    body: {
      code: 400,
      error: error.message
    }
  }
  return response
}

export const badRequestValidation = (result: ValidationResult, message?: string): HttpResponse => {
  const response: HttpResponse = {
    statusCode: 400,
    body: {
      code: 400,
      message,
      errors: result.error.details
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
