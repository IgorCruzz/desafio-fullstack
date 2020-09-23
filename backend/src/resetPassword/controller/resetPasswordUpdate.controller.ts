import { Controller, Put, Req } from '@nestjs/common'
import { ResetPasswordUpdateService } from '../service/resetPasswordUpdate.service'
import { Request } from 'express'
import { UpdateResult } from 'typeorm'

/**
 * Controller  - Serve para setar o tipo de requisição e retorna a reposta
 */

@Controller('reset') // NOME DA ROTA
export class ResetPasswordUpdateController {
  constructor(private resetPasswordUpdateService: ResetPasswordUpdateService) {}

  @Put(':code') // Tipo do método ':code' nome do parametro
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return this.resetPasswordUpdateService.execute(req)
  }
}
