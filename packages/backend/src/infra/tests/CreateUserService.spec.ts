import AppError from '@validation/errors/AppError'
import FakeUsersRepository from '@domain/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@data/protocols/criptography/providers/HashPovider/fakes/FakeHashProvider'
import CreateUserService from '../services/CreateUserService'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'James',
      lastname: 'Smith',
      phone: '42999999999',
      email: 'jamessmith@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'James',
      lastname: 'Smith',
      phone: '42999999999',
      email: 'jamessmith@example.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'James',
        lastname: 'Smith',
        phone: '42999999999',
        email: 'jamessmith@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
