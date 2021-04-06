import { FreightModel } from '@/domain/models/freight-model'

export interface FindFreightRepository {
  find: (id: string) => Promise<FreightModel>
}
