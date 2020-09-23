import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../../service/user.service'
import { User } from '../../../entities/user.entity'
import { Authentication } from '../../../entities/Authentication.entity'

jest.mock('../../../mail/authenticationMail')

describe('UserService', () => {
  let service: UserService
  let user: Repository<User>
  let authentication: Repository<Authentication>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Authentication),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    user = module.get<Repository<User>>(getRepositoryToken(User))
    authentication = module.get<Repository<Authentication>>(
      getRepositoryToken(Authentication)
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create a new user', async () => {
    jest.spyOn(user, 'findOne').mockResolvedValue(undefined)

    jest.spyOn(user, 'save').mockResolvedValue({
      id: 1,
      name: 'username',
      lastname: 'lastname',
      email: 'user@email.com',
      passwordHash: 'password',
      cellphone: '21999999999',
    })

    jest.spyOn(authentication, 'save').mockResolvedValue({
      userId: 1,
      token: 'token',
    })

    const req: any = {
      body: {
        name: 'username',
        lastname: 'lastname',
        email: 'user@email.com',
        password: 'password',
        confirmPassword: 'password',
        cellphone: '2199999999',
      },
    }

    const result = await service.execute(req)

    expect(user.save).toHaveBeenCalledTimes(1)
    expect(user.findOne).toHaveBeenCalledWith({ email: 'user@email.com' })
    expect(result).toContainAllKeys(['id', 'name', 'cellphone', 'email'])
  })

  it('throws an error if the email passed through the body has already been registered', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue({
        id: 1,
        name: 'username',
        lastname: 'lastname',
        email: 'user@email.com',
        passwordHash: 'password',
        cellphone: '2199999999',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const req: any = {
        body: {
          name: 'username',
          lastname: 'lastname',
          email: 'user@email.com',
          password: 'password',
          confirmPassword: 'password',
          cellphone: '2199999999',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.save).not.toBeCalled()
      expect(user.findOne).toHaveBeenCalledWith({ email: 'user@email.com' })
      expect(err.message).toStrictEqual('Http Exception')
    }
  })
})
