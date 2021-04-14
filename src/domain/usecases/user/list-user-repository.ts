import { UserModel } from '@/domain/models/user-model'
import { ListReturn } from '@/domain/types/list-return'

export interface ListUserRepository {
  list: (list: number) => Promise<ListReturn<UserModel>>
}
