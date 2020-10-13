import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateUserService from '@infra/services/CreateUserService'

class UsersController {
  public async create (request: Request, response: Response) {
    const { name, lastname, email, password, phone } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      name,
      lastname,
      email,
      password,
      phone
    })

    return response.status(201).json({
      status: 'success',
      data: {
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone
        }
      }
    })
  }
}

export default UsersController
