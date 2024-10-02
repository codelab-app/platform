import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from './jwt/jwt.strategy'
import { JwtAuthGuard } from './jwt/jwt-auth.guard'
import { JwtAuthMiddleware } from './jwt-auth.middleware'

@Module({
  exports: [JwtAuthMiddleware, JwtAuthGuard, JwtStrategy],
  imports: [
    PassportModule.register({}),
    ConfigModule.forRoot({
      load: [auth0Config],
    }),
  ],
  providers: [JwtStrategy, JwtAuthMiddleware, JwtAuthGuard],
})
export class AuthModule {}
