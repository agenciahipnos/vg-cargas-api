import { Driver } from '@/domain/entities/driver'
import { DriverModel } from '@/domain/models/driver-model'
import { CreateDriverRepository } from '@/domain/usecases/driver/create-driver-repository'

export const mockDriverModel = (): DriverModel => ({
  _id: 'any_id',
  vehicle: {
    _id: 'any_id',
    modelo: 'any_modelo',
    marca: 'any_marca',
    ano: 'any_ano',
    capacidade_maxima: 'any_capacidade_maxima',
    categoria_veiculo: 'categoria_veiculo',
    placa: 'any_placa',
    carroceria: 'any_carroceria',
    antt: 'any_antt',
    seguro: true,
    rastreador: true
  },
  freight: [],
  cnh: 'any_cnh'
})

export const mockCreateDriver = (): CreateDriverRepository => {
  class CreateDriverStub implements CreateDriverRepository {
    async create (driver: Driver): Promise<DriverModel> {
      return Promise.resolve(mockDriverModel())
    }
  }
  return new CreateDriverStub()
}
