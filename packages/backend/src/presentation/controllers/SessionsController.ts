import CreateSessionService from '@infra/services/CreateSessionService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class SessionsController {
  public async create (request: Request, response: Response) {
    const { email, password } = request.body

    const createSession = container.resolve(CreateSessionService)
    const { user, token } = await createSession.execute({
      email,
      password
    })

    return response.json({
      status: 'success',
      data: {
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone
        },
        token
      }
    })
  }
}

export default SessionsController
