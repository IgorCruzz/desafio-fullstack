import { UserMiddleware } from '../user.middleware'

describe('Middleware', () => {
  const middleware = new UserMiddleware()

  it('call next function if the validate is correct', async () => {
    const Req: any = {
      body: {
        name: 'username',
        lastname: 'lastname',
        email: 'email@gmail.com',
        password: 'password',
        confirmPassword: 'password',
        cellphone: '21999999999',
      },
    }

    const Res: any = {}
    const next = jest.fn()

    await middleware.use(Req, Res, next)

    expect(next).toBeCalled()
  })

  it('thrown an error if any field has wrong', async () => {
    try {
      const Req: any = {
        body: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          cellphone: '',
        },
      }
      const Res: any = {}
      const next = jest.fn()

      await middleware.use(Req, Res, next)
    } catch (err) {
      expect(err.message).toStrictEqual('Http Exception')
    }
  })
})
