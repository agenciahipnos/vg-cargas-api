import { ListUserRepository } from '@/domain/usecases/user/list-user-repository'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class ListUserController implements Controller {
  constructor (
    private readonly listUser: ListUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const skip = httpRequest.query.skip || 0
    await this.listUser.list(skip)
    return Promise.resolve(null)
  }
}
