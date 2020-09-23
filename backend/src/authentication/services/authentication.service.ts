import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Authentication } from '../../entities/Authentication.entity'
import { Repository, UpdateResult } from 'typeorm'
import { User } from '../../entities/user.entity'
import { Request } from 'express'

/**
 * Service - onde fica toda a regra de negócio
 */

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Authentication)
    private AuthenticationService: Repository<Authentication>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { token } = req.params

    /**
     * Procurar  pelo token passado pela requisição
     */
    const authenticationExists = await this.AuthenticationService.findOne({
      token,
    })

    /**
     * Se o token não for retornado retorna um erro
     */
    if (!authenticationExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Token Invalído',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    /**
     * Procura o usuário com o respectivo token
     */
    const user = await this.userRepository.findOne({
      id: authenticationExists.userId,
    })

    /**
     * Atualiza o campo "activation" para true
     */
    return await this.userRepository.update(user.id, {
      activation: true,
    })
  }
}
