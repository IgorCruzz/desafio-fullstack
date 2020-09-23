import 'jest-extended'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticationController } from '../../controllers/authentication.controller'
import { AuthenticationService } from '../../services/authentication.service'

describe('Authentication', () => {
  let controller: AuthenticationController
  let service: AuthenticationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            execute: jest.fn().mockImplementation(() => Promise.resolve(true)),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
    service = module.get<AuthenticationService>(AuthenticationService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('AuthenticationController', () => {
    it('should be able actives an user', async () => {
      const req: any = {
        params: {
          token: 'TOKEN',
        },
      }
      await controller.execute(req)

      expect(await controller.execute(req)).toEqual(true)
      expect(service.execute).toBeCalled()
    })
  })
})
