import { Driver } from '@/domain/entities/driver'
import { DriverModel } from '@/domain/models/driver-model'

export interface CreateDriverRepository {
  create: (driver: Driver) => Promise<DriverModel>
}
