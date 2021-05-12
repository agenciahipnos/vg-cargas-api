import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { CreateCompanyRepository } from '@/domain/usecases/company/create-company-repository'
import { CreateDriverRepository } from '@/domain/usecases/driver/create-driver-repository'
import { CreateUser } from '@/domain/usecases/user/create-user'
import { BadRequest } from '@/presentation/errors/bad-request'
import { badRequest, badRequestValidation, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { AddressValidatorSchema } from '@/validation/address-validator-schema'
import { CompanyValidatorSchema } from '@/validation/company-validator-schema'
import { DriverValidationSchema } from '@/validation/driver-validation-schema'
import { UserValidatorSchema } from '@/validation/user-validation-schema'
import { VehicleValidatorSchema } from '@/validation/vehicle-validator-schema'

export class CreateUserController implements Controller {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly validator: Validator,
    private readonly createUser: CreateUser,
    private readonly createAddress: CreateAddressRepository,
    private readonly createDriver: CreateDriverRepository,
    private readonly createCompany: CreateCompanyRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validator_user_result = UserValidatorSchema.validate(httpRequest.body)
      if (validator_user_result.error) {
        return badRequestValidation(validator_user_result)
      }
      const { password } = httpRequest.body
      const decrypted_password = this.decrypter.decrypt(password)
      let company = null
      let driver = null
      if (httpRequest.body.company) {
        const validator_company_result = CompanyValidatorSchema.validate(httpRequest.body.company)
        if (validator_company_result.error) {
          return badRequestValidation(validator_company_result)
        }
        const validator_company_address_result = AddressValidatorSchema.validate(httpRequest.body.company.address)
        if (validator_company_address_result.error) {
          return badRequestValidation(validator_company_address_result)
        }
        company = await this.createCompany.create(httpRequest.body.company)
      } else if (httpRequest.body.driver) {
        const validator_driver_result = DriverValidationSchema.validate(httpRequest.body.driver)
        if (validator_driver_result.error) {
          return badRequestValidation(validator_driver_result)
        }
        const validator_vehicle_result = VehicleValidatorSchema.validate(httpRequest.body.driver.vehicle)
        if (validator_vehicle_result.error) {
          return badRequestValidation(validator_vehicle_result)
        }
        driver = await this.createDriver.create(httpRequest.body.driver)
      } else {
        throw new BadRequest('Its necessary send a company or driver model.')
      }
      const validator_user_address_result = AddressValidatorSchema.validate(httpRequest.body.address)
      if (validator_user_address_result) {
        return badRequestValidation(validator_user_address_result)
      }
      const address = await this.createAddress.create(httpRequest.body.address)
      const body = Object.assign({}, httpRequest.body, {
        password: decrypted_password,
        address: address,
        company: company,
        driver: driver
      })
      const user = await this.createUser.create(body)
      return ok(user)
    } catch (error) {
      console.error(error)
      if (error.name === 'BadRequest') {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
