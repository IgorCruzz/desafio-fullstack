import { container } from 'tsyringe'
import IAuthProvider from './AuthProvider/models/IAuthProvider'
import IHashProvider from './HashPovider/models/IHashProvider'
import BCryptHashProvider from './HashPovider/implementations/BCryptHashProvider'
import JWTAuthProvider from './AuthProvider/implementations/JWTAuthProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider)
