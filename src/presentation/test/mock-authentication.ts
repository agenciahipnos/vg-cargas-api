import { Authentication } from '../protocols/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authenticationParams: Authentication.Params): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}
