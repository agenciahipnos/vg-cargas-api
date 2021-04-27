import { FreightModel } from '@/domain/models/freight-model'
import { UserModel } from '@/domain/models/user-model'

export interface AddFreightUserRepository {

  addFreight: (freight: FreightModel, user: UserModel) => Promise<UserModel>
}
