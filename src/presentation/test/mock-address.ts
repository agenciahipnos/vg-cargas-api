import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { Address } from '@/domain/entities/address'
import { AddressModel } from '@/domain/models/address-model'

export const mockCreateAddress = (): CreateAddressRepository => {
  class CreateAddressStub implements CreateAddressRepository {
    async create (address: Address): Promise<AddressModel> {
      return Promise.resolve({
        _id: 'any_id',
        cep: 'any_cep',
        state: 'any_state',
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        street: 'any_street',
        number: 'any_number',
        observations: 'any_observations'
      })
    }
  }
  return new CreateAddressStub()
}
