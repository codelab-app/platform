import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { AuthMiddleware } from './auth.middleware'
import { Auth0Strategy } from './jwt/jwt.strategy'
import { JwtAuthGuard } from './jwt/jwt-auth.guard'

@Module({
  exports: [AuthMiddleware, JwtAuthGuard],
  imports: [
    PassportModule.register({}),
    ConfigModule.forRoot({
      load: [auth0Config],
    }),
  ],
  providers: [Auth0Strategy, AuthMiddleware, JwtAuthGuard],
})
export class AuthModule {}
