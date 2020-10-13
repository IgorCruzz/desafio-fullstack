import { getRepository, Repository } from 'typeorm'
import User from '../../entities/User'
import IUserRespository from '../../repositories/IUserRepository'
import ICreateUserDTO from '../../dtos/ICreateUserDTO'
import { validate } from 'class-validator'
import ValidationError from '@validation/errors/ValidationError'

class UsersRepository implements IUserRespository {
  private ormRepository: Repository<User>

  constructor () {
    this.ormRepository = getRepository(User)
  }

  public async save (user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async create ({
    name,
    lastname,
    email,
    password,
    phone
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      lastname,
      phone,
      email,
      password
    })

    const errors = await validate(user)

    if (errors.length > 0) {
      throw new ValidationError(errors)
    }

    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    })
    return user
  }
}

export default UsersRepository
