import { DbCreateUser } from '@/data/usecases/user/create-user/db-create-user'
import { CreateUser } from '@/domain/usecases/user/create-user'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { CreateUserRepositoryImpl } from '@/infra/datasources/mongo/repositories/user/create/create-user-repository'
import env from '@/main/config/env'

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const hasher_adapter = new BcryptAdapter(salt)
  const jwt_adapter = new JwtAdapter(env.jwt_secret)
  const create_user_repository = new CreateUserRepositoryImpl()

  return new DbCreateUser(hasher_adapter, create_user_repository, jwt_adapter)
}
