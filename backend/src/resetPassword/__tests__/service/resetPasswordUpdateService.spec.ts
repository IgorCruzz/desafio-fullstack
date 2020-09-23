import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../../../entities/user.entity'
import { Repository } from 'typeorm'
import { ResetPassword } from '../../../entities/ResetPassword.entity'
import { ResetPasswordUpdateService } from '../../service/resetPasswordUpdate.service'

describe('ResetPasswordUpdateService', () => {
  let service: ResetPasswordUpdateService
  let resetPassword: Repository<ResetPassword>
  let user: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordUpdateService,
        {
          provide: getRepositoryToken(ResetPassword),
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

    service = module.get<ResetPasswordUpdateService>(ResetPasswordUpdateService)
    resetPassword = module.get<Repository<ResetPassword>>(
      getRepositoryToken(ResetPassword)
    )
    user = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to update the password', async () => {
    jest.spyOn(user, 'findOne').mockResolvedValue({
      id: 1,
      name: 'username',
      lastname: 'lastname',
      email: 'user@gmail.com',
      cellphone: '21999999999',
    })

    jest.spyOn(resetPassword, 'findOne').mockResolvedValue({
      userId: 1,
      resetToken: 'resetToken',
    })

    jest.spyOn(user, 'update').mockResolvedValue({
      generatedMaps: [],
      raw: [],
      affected: 1,
    })

    const req: any = {
      params: { code: 'resetToken' },
      body: {
        email: 'user@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      },
    }

    const result = await service.execute(req)

    expect(resetPassword.findOne).toHaveBeenCalledWith({ userId: 1 })
    expect(user.findOne).toHaveBeenCalledWith({ email: 'user@gmail.com' })
    expect(user.update).toHaveBeenCalled()
    expect(result).toEqual({
      generatedMaps: [],
      raw: [],
      affected: 1,
    })
  })

  it('throws an error if doesnt has an user with the email passed through the request', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        params: { code: 'resetToken' },
        body: {
          email: 'user@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.findOne).toHaveBeenCalledWith({ email: 'user@gmail.com' })
      expect(err.message).toStrictEqual('Http Exception')
    }
  })

  it('throws an error if the code passed on request body is different than the code from database', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue({
        id: 1,
        name: 'username',
        lastname: 'lastname',
        email: 'user@gmail.com',
        cellphone: '21999999999',
      })

      jest.spyOn(resetPassword, 'findOne').mockResolvedValue({
        userId: 1,
        resetToken: 'resetToken',
      })

      const req: any = {
        params: { code: 'differentCode' },
        body: {
          email: 'user@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.findOne).toHaveBeenCalledWith({ email: 'user@gmail.com' })
      expect(err.message).toStrictEqual('Http Exception')
    }
  })
})
