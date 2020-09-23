import { Controller, Post, Req } from '@nestjs/common'
import { SessionService } from '../service/session.service'
import { Request } from 'express'
import { ICreateSessionDTO } from '../session.dto'

/**
 * Controller  - Serve para setar o tipo de requisição e retorna a reposta
 */

@Controller('session') // Nome da rota
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post() // Tipo do método
  async execute(@Req() req: Request): Promise<ICreateSessionDTO> {
    return await this.sessionService.execute(req)
  }
}
