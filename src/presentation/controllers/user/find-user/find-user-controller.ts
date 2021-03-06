import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { notFound, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class FindUserController implements Controller {
  constructor (
    private readonly findUserRepository: FindUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const user = await this.findUserRepository.find(id)

      return ok(user)
    } catch (error) {
      console.error(error)
      if (error.name === 'NotFoundError') {
        return notFound(error)
      }
      return serverError(error)
    }
  }
}
