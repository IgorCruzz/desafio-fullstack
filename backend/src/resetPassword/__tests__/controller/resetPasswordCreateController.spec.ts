import { Test, TestingModule } from '@nestjs/testing'
import { ResetPasswordCreateService } from '../../service/resetPasswordCreate.service'
import { ResetPasswordCreateController } from '../../controller/resetpasswordCreate.controller'

describe('ResetPasswordCreateController', () => {
  let controller: ResetPasswordCreateController
  let service: ResetPasswordCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordCreateController],
      providers: [
        {
          provide: ResetPasswordCreateService,
          useValue: {
            execute: jest.fn().mockImplementation(() =>
              Promise.resolve({
                userId: 2,
                resetToken: 'TOKEN',
              })
            ),
          },
        },
      ],
    }).compile()

    controller = module.get<ResetPasswordCreateController>(
      ResetPasswordCreateController
    )
    service = module.get<ResetPasswordCreateService>(ResetPasswordCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ResetPasswordCreateController', () => {
    it('should be able to reset', async () => {
      const req: any = {
        body: {
          email: 'user@gmail.com',
        },
      }

      expect(await controller.execute(req)).toEqual({
        userId: 2,
        resetToken: 'TOKEN',
      })
      expect(service.execute).toBeCalled()
    })
  })
})
