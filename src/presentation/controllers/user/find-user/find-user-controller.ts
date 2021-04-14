import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class FindUserController implements Controller {
  constructor (
    private readonly findUserRepository: FindUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params.id
    await this.findUserRepository.find(id)
    return Promise.resolve(null)
  }
}
