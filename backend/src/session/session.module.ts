import { SessionController } from './controller/session.controller'
import { SessionService } from './service/session.service'
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../jwt/constants'
import { SessionMiddleware } from './validators/session.middleware'

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: 'session', method: RequestMethod.POST })
  }
}
