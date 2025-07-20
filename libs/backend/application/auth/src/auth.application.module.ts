import { UserDomainModule } from '@codelab/backend-domain-user'
import { auth0Config } from '@codelab/backend-infra-adapter-auth0'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { JwtAuthGuard } from './jwt/jwt-auth.guard'
import { JWT_STRATEGY, JwtStrategy } from './jwt/jwt.strategy'

@Module({
  exports: [JwtAuthGuard, JwtStrategy],
  imports: [
    CacheModule.register({ ttl: 60_000 }),
    UserDomainModule,
    PassportModule.register({
      defaultStrategy: JWT_STRATEGY,
    }),
    ConfigModule.forRoot({
      load: [auth0Config],
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
