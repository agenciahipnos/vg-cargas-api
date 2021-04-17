import { FindFreightRepository } from '@/domain/usecases/freight/find-freight-repository'
import { AddFreightUserRepository } from '@/domain/usecases/user/add-freight-user-repository'
import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { notFound, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddFreightUserController implements Controller {
  constructor (
    private readonly findUser: FindUserRepository,
    private readonly findFreight: FindFreightRepository,
    private readonly addFreightUser: AddFreightUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { user_id, freight_id } = httpRequest.body
      const user = await this.findUser.find(user_id)
      const freight = await this.findFreight.find(freight_id)
      const user_updated = await this.addFreightUser.addFreight(freight, user)
      ok(user_updated)
    } catch (error) {
      console.error(error)
      if (error.name === 'NotFoundError') {
        return notFound(error)
      }
      return serverError(error)
    }
  }
}
