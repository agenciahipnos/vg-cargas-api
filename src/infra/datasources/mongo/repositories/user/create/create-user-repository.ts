import jwt from 'jsonwebtoken'
import { User } from '@/domain/entities/user'
import { CreateUserRepository, CreateUserReturnParams } from '@/domain/usecases/user/create-user-repository'
import { UserMongo } from '@/infra/db/mongodb/schemas/user-schema'
import env from '@/main/config/env'

export class CreateUserRepositoryImpl implements CreateUserRepository {
  async create (user: User): Promise<CreateUserReturnParams> {
    const create_user = await UserMongo.create(user)
    if (create_user) {
      const token = jwt.sign({ id: create_user._id }, env.jwt_secret, {
        expiresIn: env.jwt_expire_time
      })
      return {
        user: create_user,
        access_token: token
      }
    }
  }
}
