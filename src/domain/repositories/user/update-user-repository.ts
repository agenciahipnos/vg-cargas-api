import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'

export interface UpdateUserRepository {
  update: (id: string, user: User) => Promise<UserModel>
}
