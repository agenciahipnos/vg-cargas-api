import { badRequestValidation, forbidden, serverError } from '@/presentation/helpers/http-helper'
import { Authentication } from '@/presentation/protocols/authentication'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { mockAuthentication } from '@/presentation/test/mock-authentication'
import { mockDecrypter } from '@/presentation/test/mock-decrypter'
import { mockValidator } from '@/presentation/test/mock-validator'
import { mockValidatorResultBadRequest } from '@/presentation/test/mock-validator-result'
import { LoginController } from './login-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_encrypted_password'
  }
})

type SutTypes = {
  sut: LoginController
  validatorStub: Validator
  decrypterStub: Decrypter
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validatorStub = mockValidator()
  const decrypterStub = mockDecrypter()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(validatorStub, decrypterStub, authenticationStub)
  return {
    sut,
    validatorStub,
    decrypterStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validatorSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockRequest())
    expect(validatorSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => mockValidatorResultBadRequest())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequestValidation(mockValidatorResultBadRequest()))
  })

  test('should return 500 if Validator throws', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Decrypter with correct values', async () => {
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

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith(Object.assign({}, mockRequest().body, { password: 'any_decrypted_password' }))
  })

  test('should return 403 if user has invalid credentials', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => null)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new Error('Invalid Credentials!')))
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
