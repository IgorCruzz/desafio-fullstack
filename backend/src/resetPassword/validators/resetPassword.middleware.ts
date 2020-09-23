import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import * as Yup from 'yup'

@Injectable()
/**
 * ResetPasswordMiddleware
 * Validação de campo da requisição
 */
export class ResetPasswordMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    try {
      /**
       * Seta o tipo de validação
       */
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigratório'),
        password: Yup.string().required('Campo obrigratório'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), 'O campo de senha não bate'])
          .required('Campo obrigratório'),
      })
      /**
       * Verifica se os dados foram passado corretamente
       */
      await schema.validate(req.body, { abortEarly: false })
      /**
       * Caso tiver OK é disparado o next
       */
      next()
    } catch (err) {
      /**
       * Se tiver algum erro, retorna um erro na tela
       */
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.errors,
        },
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
