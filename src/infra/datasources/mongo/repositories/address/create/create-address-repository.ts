import { Address } from "@/domain/entities/address";
import { AddressModel } from "@/domain/models/address-model";
import { CreateAddressRepository } from "@/domain/usecases/address/create-address-repository";

export class CreateAddressRepositoryImpl implements CreateAddressRepository {
  async create (address: Address): Promise<AddressModel> {
    const create_address = await 
  }
}