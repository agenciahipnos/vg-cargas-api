import { RSAAdapter } from '@/infra/cryptography/rsa-adapter'
import { CreateAddressRepositoryImpl } from '@/infra/datasources/mongo/repositories/address/create/create-address-repository'
import { CreateCompanyRepositoryImpl } from '@/infra/datasources/mongo/repositories/company/create/create-company-repository'
import { CreateDriverRepositoryImpl } from '@/infra/datasources/mongo/repositories/driver/create/create-driver-repository'
import { CreateUserController } from '@/presentation/controllers/user/create-user/create-user-controller'
import { ValidatorClass } from '@/presentation/helpers/validator'
import { Controller } from '@/presentation/protocols/controller'
import { makeDbCreateUser } from '../../usecases/user/db-create-user-factory'

export const makeCreateUserController = (): Controller => {
  const validator = new ValidatorClass()
  const decrypter = new RSAAdapter()
  const create_address_repository = new CreateAddressRepositoryImpl()
  const create_company_repository = new CreateCompanyRepositoryImpl()
  const create_driver_repository = new CreateDriverRepositoryImpl()
  return new CreateUserController(
    decrypter,
    validator,
    makeDbCreateUser(),
    create_address_repository,
    create_driver_repository,
    create_company_repository
  )
}
