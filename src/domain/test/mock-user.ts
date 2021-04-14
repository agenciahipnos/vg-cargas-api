import { mockUserModel } from '@/presentation/test/mock-user'
import { UserModel } from '../models/user-model'
import { ListReturn } from '../types/list-return'

export const mockListUserModel = (): ListReturn<UserModel> => {
  const arrayUser = []
  arrayUser.push(mockUserModel())
  return {
    count: 1,
    items: arrayUser
  }
}
