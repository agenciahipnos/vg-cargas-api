import { Hasher } from '@/data/protocols/hasher'
import { JwtEncrypter } from '@/data/protocols/jwt-encrypter'
import { User } from '@/domain/entities/user'
import { CreateUser, CreateUserReturnParams } from '@/domain/usecases/user/create-user'
import { CreateUserRepository } from '@/domain/usecases/user/create-user-repository'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  async create (user: User): Promise<CreateUserReturnParams> {
    const hashed_password = await this.hasher.hash(user.password)
    const usuario_data = Object.assign({}, user, {
      password: hashed_password,
      address: null,
      driver: null,
      company: null
    })
    const created_user = await this.createUserRepository.create(usuario_data)
    const access_token = await this.jwtEncrypter.encrypt(created_user)
    return {
      user: created_user,
      access_token: access_token
    }
  }
}
