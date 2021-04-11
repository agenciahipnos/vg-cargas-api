import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'
import { badRequestValidation, serverError } from '@/presentation/helpers/http-helper'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { mockDecrypter } from '@/presentation/test/mock-decrypter'
import { mockCreateUser } from '@/presentation/test/mock-user'
import { mockValidator } from '@/presentation/test/mock-validator'
import { mockValidatorResultBadRequest } from '@/presentation/test/mock-validator-result'
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

  test('should return 500 if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validatorSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockRequest())
    const input = Object.assign({}, mockRequest().body, { password: 'any_decrypted_password' })
    expect(validatorSpy).toHaveBeenCalledWith(input)
  })

  test('should return 500 if Validation throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => mockValidatorResultBadRequest())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequestValidation(mockValidatorResultBadRequest()))
  })

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createUserSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(mockRequest())
    const input = Object.assign({}, mockRequest().body, { password: 'any_decrypted_password' })
    expect(createUserSpy).toHaveBeenCalledWith(input)
  })
})
