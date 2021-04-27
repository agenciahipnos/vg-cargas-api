import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'
import { CreateUserRepository, CreateUserReturnParams } from '@/domain/usecases/user/create-user-repository'

export class CreateUserRepositoryImpl implements CreateUserRepository {
  async create (user: User): Promise<CreateUserReturnParams> {

  }
}
