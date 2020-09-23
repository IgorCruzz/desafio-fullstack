import { SessionMiddleware } from '../session.middleware'

describe('Middleware', () => {
  const middleware = new SessionMiddleware()

  it('call next function if the validate is correct', async () => {
    const Req: any = {
      body: {
        email: 'email@gmail.com',
        password: 'password',
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
          email: '',
          password: '',
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
