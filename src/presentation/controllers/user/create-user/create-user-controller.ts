import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { CreateCompanyRepository } from '@/domain/usecases/company/create-company-repository'
import { CreateDriverRepository } from '@/domain/usecases/driver/create-driver-repository'
import { CreateUser } from '@/domain/usecases/user/create-user'
import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { BadRequest } from '@/presentation/errors/bad-request'
import { badRequest, badRequestValidation, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { CreateUserControllerValidateCompany, CreateUserControllerValidateDriver, CreateUserControllerValidateUser, CreateUserControllerValidateUserAddress } from './create-user-controller-validator'

export class CreateUserController implements Controller {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly validator: Validator,
    private readonly createUser: CreateUser,
    private readonly createAddress: CreateAddressRepository,
    private readonly createDriver: CreateDriverRepository,
    private readonly createCompany: CreateCompanyRepository,
    private readonly findUser: FindUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      CreateUserControllerValidateUser(httpRequest.body)
      const { password } = httpRequest.body
      const decrypted_password = this.decrypter.decrypt(password)
      let company = null
      let driver = null
      if (httpRequest.body.company) {
        CreateUserControllerValidateCompany(httpRequest.body.company)
        company = await this.createCompany.create(httpRequest.body.company)
      } else if (httpRequest.body.driver) {
        CreateUserControllerValidateDriver(httpRequest.body.driver)
        driver = await this.createDriver.create(httpRequest.body.driver)
      } else {
        throw new BadRequest('Its necessary send a company or driver model.')
      }
      CreateUserControllerValidateUserAddress(httpRequest.body.address)
      const address = await this.createAddress.create(httpRequest.body.address)
      const body = Object.assign({}, httpRequest.body, {
        password: decrypted_password,
        address,
        company,
        driver
      })
      const user = await this.createUser.create(body)
      return ok(user)
    } catch (error) {
      console.error(error)
      if (error.name === 'BadRequest') {
        return badRequest(error)
      } else if (error.name === 'BadRequestValidation') {
        return badRequestValidation(error.getValidationResult(), error.message)
      }
      return serverError(error)
    }
  }
}
