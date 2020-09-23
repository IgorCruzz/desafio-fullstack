import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'
import { Request } from 'express'
import * as bcrypt from 'bcryptjs'
import { AuthenticationMail } from '../../mail/authenticationMail'
import { Authentication } from '../../entities/Authentication.entity'
import * as crypto from 'crypto'
import { IUserCreateDTO } from '../user.dto'

/**
 * Service - onde fica toda a regra de negócio
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Authentication)
    private authenticationRepository: Repository<Authentication>
  ) {}

  async execute(req: Request): Promise<IUserCreateDTO> {
    /**
     * Pega o email que vem da  requisição
     * com a desestruturação
     */
    const { email, password, name, lastname, cellphone } = req.body

    /**
     * Procura um usuário que tenha o e-mail passado na requisição
     */
    const checkEmail = await this.userRepository.findOne({ email })

    /**
     *  Dispara um erro, se existir um usuário com o e-mail
     *  passado na requisição
     */
    if (checkEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Já existe um usuário com este e-mail',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    /**
     *  Registra o usuário no banco de dados
     */
    const user = await this.userRepository.save({
      name,
      lastname,
      cellphone: cellphone.split(' ').join(''),
      passwordHash: bcrypt.hashSync(password, 8),
      email: email.toLowerCase().trim(),
    })

    const token = await this.authenticationRepository.save({
      userId: user.id,
      email: user.email,
      token: crypto.randomBytes(8).toString('hex'),
    })

    await AuthenticationMail({
      name: `${user.name} ${user.lastname}`,
      email,
      token: token.token,
    })

    /**
     * Retorna os dados do usuário registrado em formato JSON
     */
    return {
      id: user.id,
      name: `${user.name} ${user.lastname}`,
      email: user.email,
      cellphone: user.cellphone,
    }
  }
}
