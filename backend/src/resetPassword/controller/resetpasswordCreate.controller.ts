import { Controller, Post, Req } from '@nestjs/common'
import { ResetPasswordCreateService } from '../service/resetPasswordCreate.service'
import { Request } from 'express'
import { IResetPasswordDTO } from '../resetPassword.dto'

/**
 * Controller  - Serve para setar o tipo de requisição e retorna a reposta
 */

@Controller('reset') // NOME DA ROTA
export class ResetPasswordCreateController {
  constructor(private resetPasswordCreateService: ResetPasswordCreateService) {}

  @Post() // Tipo do método
  async execute(@Req() req: Request): Promise<IResetPasswordDTO> {
    return this.resetPasswordCreateService.execute(req)
  }
}
