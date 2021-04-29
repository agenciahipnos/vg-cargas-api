import { HashComparer } from '@/data/protocols/hash-compare'
import { Hasher } from '@/data/protocols/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (plaintext: string): Promise<string> {
    const hash = await bcrypt.hash(plaintext, this.salt)
    return hash
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}
