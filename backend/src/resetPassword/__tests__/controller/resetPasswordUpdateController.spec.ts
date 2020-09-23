import { Test, TestingModule } from '@nestjs/testing'
import { ResetPasswordUpdateService } from '../../service/resetPasswordUpdate.service'
import { ResetPasswordUpdateController } from '../../controller/resetPasswordUpdate.controller'

describe('ResetPasswordUpdateController', () => {
  let controller: ResetPasswordUpdateController
  let service: ResetPasswordUpdateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordUpdateController],
      providers: [
        {
          provide: ResetPasswordUpdateService,
          useValue: {
            execute: jest.fn().mockImplementation(() =>
              Promise.resolve({
                generatedMaps: [],
                raw: [],
                affected: 1,
              })
            ),
          },
        },
      ],
    }).compile()

    controller = module.get<ResetPasswordUpdateController>(
      ResetPasswordUpdateController
    )
    service = module.get<ResetPasswordUpdateService>(ResetPasswordUpdateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('ResetPasswordUpdateController', () => {
    it('should be able to reset', async () => {
      const req: any = {
        body: {
          token: 'CODE',
        },
      }

      expect(await controller.execute(req)).toEqual({
        generatedMaps: [],
        raw: [],
        affected: 1,
      })
      expect(service.execute).toBeCalled()
    })
  })
})
