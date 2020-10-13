import ICreateUserDTO from '../../dtos/ICreateUserDTO'
import User from '../../entities/User'
import IUserRepository from '../IUserRepository'

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create ({
    name,
    lastname,
    phone,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: Math.random() * 100,
      name,
      lastname,
      email,
      password
    })

    this.users.push(user)
    return user
  }

  public async findByEmail (email: string) {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  public async save (user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => (findUser.id = user.id)
    )
    this.users[findIndex] = user
    return user
  }
}

export default FakeUserRepository
