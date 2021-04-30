import { User } from '@/domain/entities/user'
import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
import { UserMongo } from '@/infra/db/mongodb/schemas/user-schema'
import { UserModel } from '@/domain/models/user-model'

export class CreateUserRepositoryImpl implements CreateUserRepository {
  async create (user: User): Promise<UserModel> {
    const create_user = await UserMongo.create(user)
    if (create_user) {
      return create_user
    }
  }
}
