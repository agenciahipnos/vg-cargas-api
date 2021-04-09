import { Authentication } from '@/presentation/protocols/authentication'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validator } from '@/presentation/protocols/validator'
import { mockAuthentication } from '@/presentation/test/mock-authentication'
import { mockDecrypter } from '@/presentation/test/mock-decrypter'
import { mockValidator } from '@/presentation/test/mock-validator'
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
})
