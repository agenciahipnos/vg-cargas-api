import { FreightModel } from '@/domain/models/freight-model'

export interface ListFreightRepository {
  list: () => Promise<FreightModel[]>
}
