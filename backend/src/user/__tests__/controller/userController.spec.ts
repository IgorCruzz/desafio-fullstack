import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../../service/user.service'
import { UserController } from '../../controller/user.controller'

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            execute: jest.fn().mockImplementation(() =>
              Promise.resolve({
                id: 1,
                name: 'username',
                email: 'user@email.com',
                cellphone: '2199999999',
              })
            ),
          },
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('UserController', () => {
    it('should be return data of the user registered', async () => {
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

      expect(await controller.execute(req)).toEqual({
        id: 1,
        name: 'username',
        email: 'user@email.com',
        cellphone: '2199999999',
      })
      expect(service.execute).toHaveBeenCalled()
    })
  })
})
