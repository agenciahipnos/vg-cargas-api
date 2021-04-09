import { Decrypter } from '../protocols/decrypter'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt (ciphertext: string): any {
      return 'any_decrypted_password'
    }
  }
  return new DecrypterStub()
}
