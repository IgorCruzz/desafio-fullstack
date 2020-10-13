import { container } from 'tsyringe'
import IUserRepository from '@domain/repositories/IUserRepository'
import UserRepository from '@domain/usecases/repositories/UserRepository'
import '@data/protocols/criptography/providers'

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository)
