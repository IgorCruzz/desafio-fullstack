import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../../../entities/user.entity'
import { AuthenticationService } from '../../services/authentication.service'
import { Repository } from 'typeorm'
import { Authentication } from '../../../entities/Authentication.entity'

describe('AuthenticationService', () => {
  let service: AuthenticationService
  let authentication: Repository<Authentication>
  let user: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(Authentication),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AuthenticationService>(AuthenticationService)
    authentication = module.get<Repository<Authentication>>(
      getRepositoryToken(Authentication)
    )
    user = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to update "activation" from user to true', async () => {
    jest.spyOn(authentication, 'findOne').mockResolvedValue({
      userId: 1,
      token: 'TOKEN',
    })

    jest.spyOn(user, 'findOne').mockResolvedValue({
      id: 1,
      name: 'username',
      lastname: 'lastname',
      email: 'user@gmail.com',
      cellphone: '21999999999',
    })

    jest.spyOn(user, 'update').mockResolvedValue({
      generatedMaps: [],
      affected: 1,
      raw: [],
    })

    const req: any = {
      params: {
        token: 'TOKEN',
      },
    }

    const result = await service.execute(req)

    expect(authentication.findOne).toHaveBeenCalledWith({ token: 'TOKEN' })
    expect(result).toEqual({
      generatedMaps: [],
      affected: 1,
      raw: [],
    })
  })

  it('throws an error if token not exists', async () => {
    try {
      jest.spyOn(authentication, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: {
          token: 'TOKEN',
        },
      }

      await service.execute(req)
    } catch (e) {
      expect(authentication.findOne).toHaveBeenCalledWith({ token: 'TOKEN' })
      expect(e.message).toStrictEqual('Http Exception')
    }
  })
})
