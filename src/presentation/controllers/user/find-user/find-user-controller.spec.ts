import { FindUserRepository } from '@/domain/usecases/user/find-user-repository'
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
})
