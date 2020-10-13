import IAuthProvider from '../models/IAuthProvider'
import ITokenDTO from '@domain/dtos/ITokenDTO'

class FakeAuthProvider implements IAuthProvider {
  public generateToken (user_id: number): ITokenDTO {
    return {
      token: 'token',
      exp: 32424234
    }
  }
}

export default FakeAuthProvider
