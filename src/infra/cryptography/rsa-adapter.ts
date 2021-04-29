import NodeRSA from 'node-rsa'
import { Decrypter } from '@/presentation/protocols/decrypter'
import { Encrypter } from '@/presentation/protocols/encrypter'
import env from '@/main/config/env'

export class RSAAdapter implements Encrypter, Decrypter {
  encrypt (plaintext: any): string {
    const key = new NodeRSA(env.public_key)
    key.setOptions({ encryptionScheme: 'pkcs1' })
    return key.encrypt(plaintext, 'base64')
  }

  decrypt (ciphertext: string): any {
    const key = new NodeRSA(env.private_key)
    key.setOptions({ encryptionScheme: 'pkcs1' })
    return key.decrypt(ciphertext, 'utf8')
  }
}
