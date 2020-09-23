import { ResetPasswordModule } from './resetPassword/resetpassword.module'
import { SessionModule } from './session/session.module'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { AuthenticationModule } from './authentication/authentication.module'

@Module({
  imports: [
    ResetPasswordModule,
    AuthenticationModule,
    SessionModule,
    UserModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
