import { UserService } from './service/user.service'
import { UserController } from './controller/user.controller'
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { UserMiddleware } from './validators/user.middleware'
import { AuthenticationModule } from '../authentication/authentication.module'

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST })
  }
}
