import { UserModel } from '@/domain/models/user-model'
import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { UserMongo } from '@/infra/db/mongodb/schemas/user-schema'

export class FindUserRepositoryImpl implements FindUserRepository {
  async find (id: string): Promise<UserModel> {
    const user = await UserMongo.findById(id)
      .populate('address')
      .populate('company')
      .populate('driver')
    if (user) {
      return user
    }
  }
}
