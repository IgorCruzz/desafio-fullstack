import * as jwt from 'jsonwebtoken'
import IAuthProvider from '../models/IAuthProvider'
import auth from '@main/config/auth'
import ITokenDTO from '@domain/dtos/ITokenDTO'

interface IDecoded {
  exp: number
}

class JWTAuthProvider implements IAuthProvider {
  public generateToken (user_id: number): ITokenDTO {
    const token = jwt.sign({ id: user_id }, auth.secret, {
      expiresIn: auth.expiresIn
    })

    const { exp } = jwt.decode(token) as IDecoded

    return {
      token,
      exp
    }
  }
}

export default JWTAuthProvider
