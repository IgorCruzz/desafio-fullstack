import IHashProvider from '../models/IHashProvider'
import { hash, compare } from 'bcryptjs'

class BCryptHashProvider implements IHashProvider {
  public async generate (payload: string): Promise<string> {
    return await hash(payload, 8)
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed)
  }
}

export default BCryptHashProvider
