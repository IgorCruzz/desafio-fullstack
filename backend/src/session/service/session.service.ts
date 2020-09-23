import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'
import { Request } from 'express'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ICreateSessionDTO } from '../session.dto'

/**
 * Service - onde fica toda a regra de negócio
 */

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private userRepostiory: Repository<User>,
    private jwtService: JwtService
  ) {}

  async execute(req: Request): Promise<ICreateSessionDTO> {
    const { password, email } = req.body

    /**
     * Procura por um usuário com o e-mail passado pela requisição
     */
    const user = await this.userRepostiory.findOne({ email })

    /**
     * Se não existir um usuário com o e-mail fornecido
     * é retornado um erro
     */
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não existe um usuário com este e-mail cadastrado',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    /**
     * Compara a senha enviada atraves da requisição com a do usuário
     * vindo pelo banco de dados
     */

    const CheckPassword = await bcrypt.compare(password, user.passwordHash)

    /**
     * Retorna um erro se a senha não for a mesma
     */
    if (!CheckPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Senha inválida',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    return {
      id: user.id,
      name: `${user.name} ${user.lastname}`,
      email: user.email,
      token: this.jwtService.sign({ sub: user.id }),
    }
  }
}
