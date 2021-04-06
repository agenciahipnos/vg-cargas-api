import { UserModel } from '@/domain/models/user-model'

export interface FindUserRepository {
  find: (id: string) => Promise<UserModel>
}
