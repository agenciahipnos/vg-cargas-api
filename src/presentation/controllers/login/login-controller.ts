import { badRequestValidation, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
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
      const decrypted_password = this.decrypter.decrypt(body.password)
      const token = await this.authentication.auth({
        email: body.email,
        password: decrypted_password
      })
      if (!token) {
        return forbidden(new Error('Invalid Credentials!'))
      }
      return ok({
        token
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
