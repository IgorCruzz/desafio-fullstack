import { Controller, Post, Req } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { Request } from 'express'
import { IUserCreateDTO } from '../user.dto'

/**
 * Controller  - Serve para setar o tipo de requisição e retorna a reposta
 */
@Controller('auth') // Nome da rota
export class UserController {
  constructor(private userService: UserService) {}

  @Post() // Método do tipo post
  async execute(@Req() req: Request): Promise<IUserCreateDTO> {
    return await this.userService.execute(req)
  }
}
