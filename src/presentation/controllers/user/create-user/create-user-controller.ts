import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
import { badRequestValidation, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'

export class CreateUserController implements Controller {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly validator: Validator,
    private readonly createUser: CreateUserRepository,
    private readonly createAddress: CreateAddressRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validator_result = this.validator.validate(httpRequest.body)
      if (validator_result) {
        return badRequestValidation(validator_result)
      }
      const { password } = httpRequest.body
      const decrypted_password = this.decrypter.decrypt(password)
      const address = await this.createAddress.create(httpRequest.body.address)
      const body = Object.assign({}, httpRequest.body, { password: decrypted_password })
      const user = await this.createUser.create(body)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
