import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { UpdateCompanyRepository } from '@/domain/usecases/company/update-company-repository'
import { UpdateDriverRepository } from '@/domain/usecases/driver/update-driver-repository'
import { UpdateUserRepository } from '@/domain/usecases/user/update-user-repository'
import { serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'

export class UpdateUserController implements Controller {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly validator: Validator,
    private readonly updateUser: UpdateUserRepository,
    private readonly createAddress: CreateAddressRepository,
    private readonly updateDriver: UpdateDriverRepository,
    private readonly updateCompany: UpdateCompanyRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body
      let driver = null
      let company = null
      const address = []
      if (body.driver) {
        driver = await this.updateDriver.update(body.driver)
      }
      if (body.company) {
        company = await this.updateCompany.update(body.company)
      }
      if (body.address) {
        body.address.map(async (item) => {
          address.push(await this.createAddress.create(item))
        })
      }
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
