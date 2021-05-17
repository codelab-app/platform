import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { authConfig } from './config/auth.config'
import { GqlAuthGuard } from './graphql/gql-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy, GqlAuthGuard],
  exports: [PassportModule, GqlAuthGuard],
})
export class AuthModule {}
