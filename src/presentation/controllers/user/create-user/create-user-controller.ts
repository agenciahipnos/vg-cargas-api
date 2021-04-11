import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
import { serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'

export class CreateUserController implements Controller {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly validator: Validator,
    private readonly createUser: CreateUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { password } = httpRequest.body
      const decrypted_password = this.decrypter.decrypt(password)
      const body = Object.assign({}, httpRequest.body, { password: decrypted_password })
      this.validator.validate(body)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
