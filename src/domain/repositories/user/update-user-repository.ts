import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'

export interface UpdateUserRepository {
  update: (user: User) => Promise<UserModel>
}
