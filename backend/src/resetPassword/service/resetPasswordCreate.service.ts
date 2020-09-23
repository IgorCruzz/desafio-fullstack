import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { ResetPassword } from '../../entities/ResetPassword.entity'
import { Repository } from 'typeorm'
import { Request } from 'express'
import * as crypto from 'crypto'
import { ResetPasswordMail } from '../../mail/resetPasswordMail'
import { IResetPasswordDTO } from '../resetPassword.dto'

/**
 * Service - onde fica toda a regra de negócio
 */

@Injectable()
export class ResetPasswordCreateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>
  ) {}

  async execute(req: Request): Promise<IResetPasswordDTO> {
    const { email } = req.body

    /**
     * Procura pelo  email do usuário passado na requisição
     */
    const user = await this.userRepository.findOne({ email: email.toLowerCase().trim() })

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
     * Salva um token para o usuário mudar a senha
     */
    const reset = await this.resetPasswordRepository.save({
      userId: user.id,
      resetToken: crypto.randomBytes(8).toString('hex'),
    })

    // Envia o e-mail com o link para mudar a senha
    await ResetPasswordMail({
      name: user.name,
      email: user.email,
      token: reset.resetToken,
    })

    return {
      userId: reset.userId,
      resetToken: reset.resetToken,
    }
  }
}
