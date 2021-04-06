import { Freight } from '@/domain/entities/freight'
import { FreightModel } from '@/domain/models/freight-model'

export interface UpdateFreightRepository {
  update: (id: string, freight: Freight) => Promise<FreightModel>
}
