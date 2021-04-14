import { ListUserRepository } from '@/domain/usecases/user/list-user-repository'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class ListUserController implements Controller {
  constructor (
    private readonly listUser: ListUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const skip = parseInt(httpRequest.query.skip) || 0
      const users = await this.listUser.list(skip)
      return ok(users)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
