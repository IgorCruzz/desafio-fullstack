import AppError from '@validation/errors/AppError'
import { inject, injectable } from 'tsyringe'
import User from '@domain/entities/User'
import IAuthProvider from '@data/protocols/criptography/providers/AuthProvider/models/IAuthProvider'
import IHashProvider from '@data/protocols/criptography/providers/HashPovider/models/IHashProvider'
import IUserRepository from '@domain/repositories/IUserRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: {
    value: string
    exp: number
  }
}

@injectable()
class CreateSessionService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('AuthProvider')
    private authProvider: IAuthProvider
  ) {}

  public async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect Email!')
    }

    const checkPassMatch = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!checkPassMatch) {
      throw new AppError('Incorrect Password!')
    }

    const token = this.authProvider.generateToken(user.id)

    return {
      user,
      token: {
        value: token.token,
        exp: token.exp
      }
    }
  }
}

export default CreateSessionService
