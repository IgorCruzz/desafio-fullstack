import { Test, TestingModule } from '@nestjs/testing'
import { SessionService } from '../../service/session.service'
import { SessionController } from '../../controller/session.controller'

describe('SessionController', () => {
  let controller: SessionController
  let service: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            execute: jest.fn().mockImplementation(() =>
              Promise.resolve({
                id: 1,
                name: 'username',
                email: 'user@email.com',
                token: 'TOKEN',
              })
            ),
          },
        },
      ],
    }).compile()

    controller = module.get<SessionController>(SessionController)
    service = module.get<SessionService>(SessionService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('SessionController', () => {
    it('should be return data of the user logged', async () => {
      const req: any = {
        body: {
          email: 'user@email.com',
          password: 'password',
          confirmPassword: 'password',
          cellphone: '2199999999',
        },
      }

      expect(await controller.execute(req)).toEqual({
        id: 1,
        name: 'username',
        email: 'user@email.com',
        token: 'TOKEN',
      })
      expect(service.execute).toHaveBeenCalled()
    })
  })
})
