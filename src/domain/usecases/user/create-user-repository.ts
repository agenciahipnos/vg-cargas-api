import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'

export interface CreateUserRepository {
  create: (user: User) => Promise<UserModel>
}
