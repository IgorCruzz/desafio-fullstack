import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../../../entities/user.entity'
import { Repository } from 'typeorm'
import { ResetPassword } from '../../../entities/ResetPassword.entity'
import { ResetPasswordCreateService } from '../../service/resetPasswordCreate.service'

jest.mock('../../../mail/resetPasswordMail')

describe('resetPasswordCreateService', () => {
  let service: ResetPasswordCreateService
  let resetPassword: Repository<ResetPassword>
  let user: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordCreateService,
        {
          provide: getRepositoryToken(ResetPassword),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ResetPasswordCreateService>(ResetPasswordCreateService)
    resetPassword = module.get<Repository<ResetPassword>>(
      getRepositoryToken(ResetPassword)
    )
    user = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create a code to reset the password', async () => {
    jest.spyOn(user, 'findOne').mockResolvedValue({
      id: 1,
      name: 'username',
      lastname: 'lastname',
      email: 'user@gmail.com',
      cellphone: '21999999999',
    })

    jest.spyOn(resetPassword, 'save').mockResolvedValue({
      userId: 1,
      resetToken: 'token',
    })

    const req: any = {
      body: {
        email: 'user@gmail.com',
      },
    }

    const result = await service.execute(req)

    expect(user.findOne).toHaveBeenCalledWith({ email: 'user@gmail.com' })

    expect(result).toContainAllKeys(['userId', 'resetToken'])
  })

  it('throw an error if dont has a user with the email passed on the request', async () => {
    try {
      jest.spyOn(user, 'findOne').mockResolvedValue(undefined)

      const req: any = {
        body: {
          email: 'email@gmail.com',
        },
      }

      await service.execute(req)
    } catch (err) {
      expect(user.findOne).toHaveBeenCalledWith({ email: 'email@gmail.com' })
      expect(resetPassword.save).not.toHaveBeenCalled()
      expect(err.message).toStrictEqual('Http Exception')
    }
  })
})
