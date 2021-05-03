import { mockCompany } from '@/domain/test/mock-company'
import { CreateAddressRepository } from '@/domain/usecases/address/create-address-repository'
import { CreateCompanyRepository } from '@/domain/usecases/company/create-company-repository'
import { CreateDriverRepository } from '@/domain/usecases/driver/create-driver-repository'
import { CreateUser } from '@/domain/usecases/user/create-user'
import { badRequestValidation, ok, serverError } from '@/presentation/helpers/http-helper'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { mockAddressModel, mockCreateAddress } from '@/presentation/test/mock-address'
import { mockCreateCompany } from '@/presentation/test/mock-company'
import { mockDecrypter } from '@/presentation/test/mock-decrypter'
import { mockCreateDriver, mockDriverModel } from '@/presentation/test/mock-driver'
import { mockCreateUser, mockCreateUserReturn } from '@/presentation/test/mock-user'
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
  createUserStub: CreateUser
  createAddressStub: CreateAddressRepository
  createCompanyStub: CreateCompanyRepository
  createDriverStub: CreateDriverRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const validatorStub = mockValidator()
  const createUserStub = mockCreateUser()
  const createAddressStub = mockCreateAddress()
  const createDriverStub = mockCreateDriver()
  const createCompanyStub = mockCreateCompany()
  const sut = new CreateUserController(
    decrypterStub,
    validatorStub,
    createUserStub,
    createAddressStub,
    createDriverStub,
    createCompanyStub
  )
  return {
    sut,
    decrypterStub,
    validatorStub,
    createUserStub,
    createAddressStub,
    createCompanyStub,
    createDriverStub
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
    expect(validatorSpy).toHaveBeenCalledWith(mockRequest().body)
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

  test('should call CreateAddressRepository with correct values', async () => {
    const { sut, createAddressStub } = makeSut()
    const createAddressSpy = jest.spyOn(createAddressStub, 'create')
    await sut.handle(mockRequest())
    expect(createAddressSpy).toHaveBeenCalledWith(mockRequest().body.address)
  })

  test('should return 500 if CreateAddressRepository throws', async () => {
    const { sut, createAddressStub } = makeSut()
    jest.spyOn(createAddressStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call CreateCompanyRepository with correct values if company is sending in request', async () => {
    const { sut, createCompanyStub } = makeSut()
    const createCompanySpy = jest.spyOn(createCompanyStub, 'create')
    const mock_request = mockRequest()
    const company = mockCompany()
    const body = Object.assign({}, mock_request.body, { company, driver: null })
    await sut.handle({ body })
    expect(createCompanySpy).toHaveBeenCalledWith(body.company)
  })

  test('should return 500 if CreateCompanyRepository throws', async () => {
    const { sut, createCompanyStub } = makeSut()
    jest.spyOn(createCompanyStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const mock_request = mockRequest()
    const company = mockCompany()
    const body = Object.assign({}, mock_request.body, { company, driver: null })
    const response = await sut.handle({ body })
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call CreateDriverRepository with correct values', async () => {
    const { sut, createDriverStub } = makeSut()
    const createDriverSpy = jest.spyOn(createDriverStub, 'create')
    await sut.handle(mockRequest())
    expect(createDriverSpy).toHaveBeenCalledWith(mockRequest().body.driver)
  })

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createUserSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(mockRequest())
    const input = Object.assign({}, mockRequest().body, {
      password: 'any_decrypted_password',
      address: mockAddressModel(),
      driver: mockDriverModel(),
      company: null
    })
    expect(createUserSpy).toHaveBeenCalledWith(input)
  })

  test('should return 500 if CreateUserRepository throws', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockCreateUserReturn()))
  })
})
