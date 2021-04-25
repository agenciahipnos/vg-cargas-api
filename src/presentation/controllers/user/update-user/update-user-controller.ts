import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { UpdateCompanyRepository } from '@/domain/usecases/company/update-company-repository'
import { UpdateDriverRepository } from '@/domain/usecases/driver/update-driver-repository'
import { UpdateUserRepository } from '@/domain/usecases/user/update-user-repository'
import { badRequestValidation, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'

export class UpdateUserController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly updateUser: UpdateUserRepository,
    private readonly createAddress: CreateAddressRepository,
    private readonly updateDriver: UpdateDriverRepository,
    private readonly updateCompany: UpdateCompanyRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = httpRequest.body
      const id = httpRequest.params.id
      const validator_result = this.validator.validate(body)
      if (validator_result) {
        return badRequestValidation(validator_result)
      }
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
          const create_address = await this.createAddress.create(item)
          address.push(create_address)
        })
      }
      const new_body = Object.assign({}, body, { driver, company, address })
      const updated_user = await this.updateUser.update(id, new_body)
      return ok(updated_user)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
