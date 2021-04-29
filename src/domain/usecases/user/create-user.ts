import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'

export type CreateUserReturnParams = {
  user: UserModel
  access_token: string
}

export interface CreateUser {
  create: (user: User) => Promise<CreateUserReturnParams>
}
