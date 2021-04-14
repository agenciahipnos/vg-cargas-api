import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
import { NotFoundErrorFactory } from '@/infra/errors/not-found-error'
import { notFound, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockFindUser } from '@/presentation/test/mock-user'
import { FindUserController } from './find-user-controller'

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  findUserStub: FindUserRepository
  sut: FindUserController
}

const makeSut = (): SutTypes => {
  const findUserStub = mockFindUser()
  const sut = new FindUserController(findUserStub)
  return {
    findUserStub,
    sut
  }
}

describe('Find user Controller', () => {
  test('should call FindUserRepository with correct values', async () => {
    const { sut, findUserStub } = makeSut()
    const findUserSpy = jest.spyOn(findUserStub, 'find')
    await sut.handle(mockRequest())
    expect(findUserSpy).toHaveBeenCalledWith(mockRequest().params.id)
  })

  test('should return 500 if FindUserRepository throws', async () => {
    const { sut, findUserStub } = makeSut()
    jest.spyOn(findUserStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 404 if no user was found', async () => {
    const { sut, findUserStub } = makeSut()
    const error = NotFoundErrorFactory('user')
    jest.spyOn(findUserStub, 'find').mockImplementationOnce(() => {
      throw error
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFound(error))
  })
})
