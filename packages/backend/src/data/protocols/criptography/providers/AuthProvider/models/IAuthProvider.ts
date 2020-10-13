import ITokenDTO from '@domain/dtos/ITokenDTO'

export default interface IAuthProvider {
  generateToken(user_id: number): ITokenDTO
}
