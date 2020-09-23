import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SessionService } from '../../service/session.service'
import { User } from '../../../entities/user.entity'
import { JwtModule } from '@nestjs/jwt/dist/jwt.module'
import { jwtConstants } from '../../../jwt/constants'
import * as bcrypt from 'bcryptjs'

describe('SessionService', () => {
  let service: SessionService
  let user: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        SessionService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<SessionService>(SessionService)
    user = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to login', async () => {
    jest.spyOn(user, 'findOne').mockResolvedValue({
      id: 1,
      name: 'username',
      lastname: 'lastname',
      email: 'email@gmail.com',
      passwordHash: 'password',
      cellphone: '21999999999',
    })

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true)

    const req: any = {
      body: {
        email: 'email@gmail.com',
        password: 'password',
      },
    }

    const result = await service.execute(req)

    expect(user.findOne).toHaveBeenCalledWith({ email: 'email@gmail.com' })
    expect(result).toContainAllKeys(['id', 'name', 'email', 'token'])
  })

  it('throws an error if password has been passed wrong', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue({
        id: 1,
        name: 'username',
        lastname: 'lastname',
        email: 'email@gmail.com',
        passwordHash: 'password',
        cellphone: '21999999999',
      })

      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false)

      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: '123456789',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.findOne).toHaveBeenCalledWith({ email: 'email@gmail.com' })
      expect(err.message).toStrictEqual('Http Exception')
    }
  })

  it('throws an error if has no one user with the email passed', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        body: {
          email: 'email@gmail.com',
          password: 'password',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.findOne).toHaveBeenCalledWith({ email: 'email@gmail.com' })
      expect(err.message).toStrictEqual('Http Exception')
    }
  })
})
