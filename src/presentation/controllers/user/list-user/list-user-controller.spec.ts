import { ListUserRepository } from '@/domain/usecases/user/list-user-repository'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockListUser } from '@/presentation/test/mock-user'
import { ListUserController } from './list-user-controller'

const mockRequest = (): HttpRequest => ({
  query: {
    skip: 1
  }
})

type SutTypes = {
  listUserStub: ListUserRepository
  sut: ListUserController
}

const makeSut = (): SutTypes => {
  const listUserStub = mockListUser()
  const sut = new ListUserController(listUserStub)
  return {
    listUserStub,
    sut
  }
}

describe('List User Controller', () => {
  test('should call ListUserRepository with correct values', async () => {
    const { sut, listUserStub } = makeSut()
    const listUserSpy = jest.spyOn(listUserStub, 'list')
    await sut.handle(mockRequest())
    expect(listUserSpy).toHaveBeenCalledWith(mockRequest().query.skip)
  })

  test('should call ListUserRepository with 0 if skip not was send in request', async () => {
    const { sut, listUserStub } = makeSut()
    const listUserSpy = jest.spyOn(listUserStub, 'list')
    const request = mockRequest()
    delete request.query.skip
    await sut.handle(request)
    expect(listUserSpy).toHaveBeenCalledWith(0)
  })

  test('should call ListUserRepository with a number', async () => {
    const { sut, listUserStub } = makeSut()
    const listUserSpy = jest.spyOn(listUserStub, 'list')
    const request = mockRequest()
    request.query.skip = '1'
    await sut.handle(request)
    expect(listUserSpy).toHaveBeenCalledWith(parseInt(request.query.skip))
  })
})
