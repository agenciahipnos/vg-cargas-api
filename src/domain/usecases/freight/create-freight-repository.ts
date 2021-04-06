import { Freight } from '@/domain/entities/freight'
import { FreightModel } from '@/domain/models/freight-model'

export interface CreateFreightRepository {
  create: (freight: Freight) => Promise<FreightModel>
}
