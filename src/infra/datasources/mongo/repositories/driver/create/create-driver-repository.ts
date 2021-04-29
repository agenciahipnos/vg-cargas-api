import { Driver } from '@/domain/entities/driver'
import { DriverModel } from '@/domain/models/driver-model'
import { CreateDriverRepository } from '@/domain/usecases/driver/create-driver-repository'
import { DriverMongo } from '@/infra/db/mongodb/schemas/driver-schema'

export class CreateDriverRepositoryImpl implements CreateDriverRepository {
  async create (driver: Driver): Promise<DriverModel> {
    const create_driver = await DriverMongo.create(driver)
    if (create_driver) {
      return create_driver
    }
  }
}
