import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { mockDecrypter } from '@/presentation/test/mock-decrypter'
import { mockCreateUser } from '@/presentation/test/mock-user'
import { mockValidator } from '@/presentation/test/mock-validator'
import { CreateUserController } from './create-user-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    address: [
      {
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
      vehicle: {
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
    company: null,
    email: 'any_email',
    password: 'any_password',
    name: 'any_name',
    cpf: 'any_cpf',
    birthdate: 'any_birthdate',
    phone: 'any_phone',
    type: 'any_type'
  }
})

type SutTypes = {
  sut: CreateUserController
  decrypterStub: Decrypter
  validatorStub: Validator
  createUserStub: CreateUserRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const validatorStub = mockValidator()
  const createUserStub = mockCreateUser()
  const sut = new CreateUserController(decrypterStub, validatorStub, createUserStub)
  return {
    sut,
    decrypterStub,
    validatorStub,
    createUserStub
  }
}

describe('Create User Controller', () => {
  test('should call decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.handle(mockRequest())
    expect(decryptSpy).toHaveBeenCalledWith(mockRequest().body.password)
  })
})
