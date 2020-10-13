import FakeUsersRepository from '@domain/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@data/protocols/criptography/providers/HashPovider/fakes/FakeHashProvider'
import FakeAuthProvider from '@data/protocols/criptography/providers/AuthProvider/fakes/FakeAuthProvider'
import AppError from '@validation/errors/AppError'
import CreateUserService from '../services/CreateUserService'
import CreateSessionService from '../services/CreateSessionService'

describe('CreateSession', () => {
  it('should be able to create a new session', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeAuthProvider = new FakeAuthProvider()

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAuthProvider
    )

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

    const session = await createSession.execute({
      email: user.email,
      password: user.password
    })

    expect(session).toHaveProperty('token')
  })

  it('should not be able to create a new session with an incorrect email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeAuthProvider = new FakeAuthProvider()

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAuthProvider
    )

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

    await expect(
      createSession.execute({
        email: 'incorrect@email.com',
        password: user.password
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new session with an incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeAuthProvider = new FakeAuthProvider()

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAuthProvider
    )

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

    await expect(
      createSession.execute({
        email: user.email,
        password: 'incorrectPassword'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
