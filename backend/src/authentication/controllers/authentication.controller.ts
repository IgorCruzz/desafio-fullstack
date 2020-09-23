import { Controller, Put, Req } from '@nestjs/common'
import { UpdateResult } from 'typeorm'
import { AuthenticationService } from '../services/authentication.service'
import { Request } from 'express'

/**
 * Controller  - Serve para setar o tipo de requisição e retorna a reposta
 */

@Controller('auth') // Nome da rota
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Put(':token') // Paramêtro da rota
  async execute(@Req() req: Request): Promise<UpdateResult> {
    return await this.authenticationService.execute(req)
  }
}
