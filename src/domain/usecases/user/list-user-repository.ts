import { UserModel } from '@/domain/models/user-model'

export interface ListUserRepository {
  list: () => Promise<UserModel[]>
}
