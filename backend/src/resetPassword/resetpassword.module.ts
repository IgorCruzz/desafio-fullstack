import { ResetPasswordCreateService } from './service/resetPasswordCreate.service'
import { ResetPasswordCreateController } from './controller/resetpasswordCreate.controller'
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResetPassword } from '../entities/ResetPassword.entity'
import { UserModule } from '../user/user.module'
import { ResetPasswordUpdateService } from './service/resetPasswordUpdate.service'
import { ResetPasswordUpdateController } from './controller/resetPasswordUpdate.controller'
import { ResetPasswordMiddleware } from './validators/resetPassword.middleware'

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([ResetPassword]),
  ],
  controllers: [ResetPasswordCreateController, ResetPasswordUpdateController],
  providers: [ResetPasswordCreateService, ResetPasswordUpdateService],
})
export class ResetPasswordModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResetPasswordMiddleware)
      .forRoutes({ path: 'reset/:code', method: RequestMethod.PUT })
  }
}
