import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

@Module({
  exports: [AuthService],
  imports: [],
  providers: [AuthService],
})
export class AuthModule {}
