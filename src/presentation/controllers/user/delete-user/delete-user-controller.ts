import { DeleteUserRepository } from '@/domain/usecases/user/delete-user-repository'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class DeleteUserController implements Controller {
  constructor (
    private readonly deleteUser: DeleteUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      await this.deleteUser.delete(id)
      return ok('Usuário deletado com sucesso!')
    } catch (error) {
      console.error(error)
      if (error.name === 'NotFoundError') {
        return notFound(error)
      }
      return serverError(error)
    }
  }
}
