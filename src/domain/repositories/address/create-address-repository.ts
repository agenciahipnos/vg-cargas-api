import { Address } from '@/domain/entities/address'
import { AddressModel } from '@/domain/models/address-model'

export interface CreateAddressRepository {
  create: (address: Address) => Promise<AddressModel>
}
