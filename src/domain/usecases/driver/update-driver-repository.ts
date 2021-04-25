import { DriverModel } from '@/domain/models/driver-model'

export interface UpdateDriverRepository {
  update: (driver: DriverModel) => Promise<DriverModel>
}
