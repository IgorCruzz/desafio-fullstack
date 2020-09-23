import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticationController } from './controllers/authentication.controller'
import { AuthenticationService } from './services/authentication.service'
import { Authentication } from '../entities/Authentication.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Authentication]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [TypeOrmModule],
})
export class AuthenticationModule {}
