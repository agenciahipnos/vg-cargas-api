import { badRequestValidation, serverError } from '@/presentation/helpers/http-helper'
import { Authentication } from '@/presentation/protocols/authentication'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly decrypter: Decrypter,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body
      const validatorResult = this.validator.validate(body)
      if (validatorResult) {
        return badRequestValidation(validatorResult)
      }
      this.decrypter.decrypt(body.password)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
