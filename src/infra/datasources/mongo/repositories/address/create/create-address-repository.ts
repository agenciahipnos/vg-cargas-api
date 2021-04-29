import { Address } from '@/domain/entities/address'
import { AddressModel } from '@/domain/models/address-model'
import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { AddressMongo } from '@/infra/db/mongodb/schemas/address-schema'

export class CreateAddressRepositoryImpl implements CreateAddressRepository {
  async create (address: Address): Promise<AddressModel> {
    const create_address = await AddressMongo.create(address)
    if (create_address) {
      return create_address
    }
  }
}
