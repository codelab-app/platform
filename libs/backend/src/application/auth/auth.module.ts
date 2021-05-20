import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { Auth0Service } from './auth0'
import { authConfig } from './config/auth.config'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy, Auth0Service],
  exports: [PassportModule, Auth0Service],
})
export class AuthModule {}
