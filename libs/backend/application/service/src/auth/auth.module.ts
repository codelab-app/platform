import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

@Module({
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
