import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { Auth0Service } from './auth0'
import { AuthTokens } from './config'
import { Auth0Config } from './config/auth.config'
import { JwtStrategy } from './strategy/jwt.strategy'

@Global()
@Module({})
export class AuthModule {
  static register(config: ConfigFactory<Auth0Config>): DynamicModule {
    return {
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      module: AuthModule,
      providers: [
        {
          provide: AuthTokens.Auth0Config,
          useValue: config(),
        },
        JwtStrategy,
        Auth0Service,
      ],
      exports: [PassportModule, Auth0Service],
    }
  }
}
