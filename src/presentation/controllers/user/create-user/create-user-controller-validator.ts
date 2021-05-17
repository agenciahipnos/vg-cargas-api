import { Company } from '@/domain/entities/company'
import { Driver } from '@/domain/entities/driver'
import { User } from '@/domain/entities/user'
import { BadRequestValidation } from '@/presentation/errors/bad-request-validation'
import { AddressValidatorSchema } from '@/validation/address-validator-schema'
import { CompanyValidatorSchema } from '@/validation/company-validator-schema'
import { DriverValidationSchema } from '@/validation/driver-validation-schema'
import { UserValidatorSchema } from '@/validation/user-validation-schema'
import { VehicleValidatorSchema } from '@/validation/vehicle-validator-schema'
import { Address } from 'node:cluster'

export const CreateUserControllerValidateUser = (user: User): void => {
  const validator_user_result = UserValidatorSchema.validate(user)
  if (validator_user_result.error) {
    throw new BadRequestValidation('User Validation Error', validator_user_result)
  }
}

export const CreateUserControllerValidateCompany = (company: Company): void => {
  const validator_company_result = CompanyValidatorSchema.validate(company)
  if (validator_company_result.error) {
    throw new BadRequestValidation('Company Validation Error', validator_company_result)
  }
  company.address.forEach((item) => {
    const validator_company_address_result = AddressValidatorSchema.validate(item)
    if (validator_company_address_result.error) {
      throw new BadRequestValidation('Company Address Validation Error', validator_company_address_result)
    }
  })
}

export const CreateUserControllerValidateUserAddress = (address: Address[]): void => {
  address.forEach((item) => {
    const validator_user_address_result = AddressValidatorSchema.validate(item)
    if (validator_user_address_result.error) {
      throw new BadRequestValidation('User Address Validation Error', validator_user_address_result)
    }
  })
}

export const CreateUserControllerValidateDriver = (driver: Driver): void => {
  const validator_driver_result = DriverValidationSchema.validate(driver)
  if (validator_driver_result.error) {
    throw new BadRequestValidation('Driver Validation Error', validator_driver_result)
  }
  const validator_vehicle_result = VehicleValidatorSchema.validate(driver.vehicle)
  if (validator_vehicle_result.error) {
    throw new BadRequestValidation('Vehicle Validation Error', validator_vehicle_result)
  }
}
