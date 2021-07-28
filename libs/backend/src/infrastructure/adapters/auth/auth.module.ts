import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { auth0Config, Auth0Module, Auth0Service } from '../../ports/auth0'
import { JwtStrategy } from './strategy/jwt.strategy'

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    Auth0Module,
    ConfigModule.forFeature(auth0Config),
  ],
  providers: [JwtStrategy, Auth0Service],
  exports: [PassportModule, Auth0Service],
})
export class AuthModule {}
