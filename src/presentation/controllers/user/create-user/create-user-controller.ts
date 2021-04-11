import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
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
    const body = httpRequest.body
    this.decrypter.decrypt(body.password)
    return Promise.resolve(null)
  }
}
