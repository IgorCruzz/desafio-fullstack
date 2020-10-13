import AppError from '@validation/errors/AppError'
import { inject, injectable } from 'tsyringe'
import User from '@domain/entities/User'
import IHashProvider from '@data/protocols/criptography/providers/HashPovider/models/IHashProvider'
import IUserRepository from '@domain/repositories/IUserRepository'

interface IRequest {
  name: string
  lastname: string
  email: string
  password: string
  phone: string
}

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute ({
    name,
    lastname,
    email,
    password,
    phone
  }: IRequest): Promise<User> {
    if (!(name && lastname && email && password && phone)) {
      throw new AppError('Please, fill all the fields')
    }

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('User already exists')
    }

    const passwordHashed = await this.hashProvider.generate(password)

    const userValidated = await this.usersRepository.create({
      name,
      lastname,
      email,
      password: passwordHashed,
      phone
    })

    const userCreated = await this.usersRepository.save(userValidated)

    return userCreated
  }
}

export default CreateUserService
