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
    const body = httpRequest.body
    this.validator.validate(body)
    return Promise.resolve(null)
  }
}
