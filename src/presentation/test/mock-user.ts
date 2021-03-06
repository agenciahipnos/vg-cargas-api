import { User } from '@/domain/entities/user'
import { UserModel } from '@/domain/models/user-model'
import { mockListUserModel } from '@/domain/test/mock-user'
import { ListReturn } from '@/domain/types/list-return'
import { CreateUser, CreateUserReturnParams } from '@/domain/usecases/user/create-user'
import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { ListUserRepository } from '@/domain/usecases/user/list-user-repository'

export const mockUserModel = (): UserModel => ({
  address: [
    {
      _id: 'any_id',
      cep: 'any_cep',
      state: 'any_state',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      street: 'any_street',
      number: 'any_number',
      observations: 'any_observations'
    }
  ],
  driver: {
    _id: 'any_id',
    vehicle: {
      _id: 'any_id',
      modelo: 'any_modelo',
      marca: 'any_marca',
      ano: 'any_ano',
      capacidade_maxima: 'any_capacidade',
      categoria_veiculo: 'any_categoria',
      placa: 'any_placa',
      carroceria: 'any_carroceria',
      antt: 'any_antt',
      seguro: true,
      rastreador: true
    },
    freight: [],
    cnh: 'any_cnh'
  },
  _id: 'any_id',
  company: null,
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  cpf: 'any_cpf',
  birthdate: 'any_birthdate',
  phone: 'any_phone',
  type: 'any_type'
})

export const mockCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    async create (usuario: User): Promise<CreateUserReturnParams> {
      return Promise.resolve({
        user: mockUserModel(),
        access_token: 'any_token'
      })
    }
  }
  return new CreateUserStub()
}

export const mockCreateUserReturn = (): CreateUserReturnParams => ({
  user: mockUserModel(),
  access_token: 'any_token'
})

export const mockListUser = (): ListUserRepository => {
  class ListUserStub implements ListUserRepository {
    async list (skip: number): Promise<ListReturn<UserModel>> {
      return Promise.resolve(mockListUserModel())
    }
  }
  return new ListUserStub()
}

export const mockFindUser = (): FindUserRepository => {
  class FindUserStub implements FindUserRepository {
    async find (id: string): Promise<UserModel> {
      return Promise.resolve(mockUserModel())
    }
  }
  return new FindUserStub()
}
