import { JwtDecrypter } from '@/data/protocols/jwt-decrypter'
import { JwtEncrypter } from '@/data/protocols/jwt-encrypter'
import { UserModel } from '@/domain/models/user-model'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements JwtEncrypter, JwtDecrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (user: UserModel, tipo?: string): Promise<string> {
    const jwt_expiration = '60d'
    return jwt.sign({
      user_id: user._id
    }, this.secret, { issuer: 'VGCARGAS', expiresIn: jwt_expiration })
  }

  decrypt (ciphertext: string): any {
    return jwt.verify(ciphertext, this.secret, { issuer: 'VGCARGAS' }) as any
  }
}
