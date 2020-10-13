import { container } from 'tsyringe'
import IAuthProvider from './AuthProvider/models/IAuthProvider'
import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import JWTAuthProvider from './AuthProvider/implementations/JWTAuthProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider)
