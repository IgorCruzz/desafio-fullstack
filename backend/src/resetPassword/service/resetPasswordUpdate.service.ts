import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { ResetPassword } from '../../entities/ResetPassword.entity'
import { Repository, UpdateResult } from 'typeorm'
import { Request } from 'express'
import * as bcrypt from 'bcryptjs'

/**
 * Service - onde fica toda a regra de negócio
 */

@Injectable()
export class ResetPasswordUpdateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>
  ) {}

  async execute(req: Request): Promise<UpdateResult> {
    const { code } = req.params
    const { email, password } = req.body

    /**
     * Procura pelo  email do usuário passado na requisição
     */
    const user = await this.userRepository.findOne({ email })

    /**
     * Se não existir retorna um erro
     */
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não existe um usuário com este e-mail',
        },
        HttpStatus.BAD_REQUEST
      )
    }
    /**
     * Verifica o id do usuário
     */
    const findUserCode = await this.resetPasswordRepository.findOne({
      userId: user.id,
    })

    /**
     * Se o token não for do usuário da requisição retorna um erro
     */
    if (code !== findUserCode.resetToken) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Solicitação inválida',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    /**
     * atualiza a senha
     */
    return await this.userRepository.update(user.id, {
      passwordHash: bcrypt.hashSync(password, 8),
    })
  }
}
