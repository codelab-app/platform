import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Auth0Strategy } from './jwt/jwt.strategy'

@Module({
  exports: [AuthService, Auth0Strategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      load: [auth0Config],
    }),
  ],
  providers: [AuthService, Auth0Strategy],
})
export class AuthModule {}
