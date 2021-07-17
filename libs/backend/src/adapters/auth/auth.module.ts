import { DynamicModule, Global, Logger, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import {
  Auth0Config,
  Auth0Module,
  Auth0Service,
  Auth0Tokens,
} from '../../infrastructure/auth0'
import { JwtStrategy } from './strategy/jwt.strategy'

@Global()
@Module({})
export class AuthModule {
  static register(config: ConfigFactory<Auth0Config>): DynamicModule {
    Logger.debug(
      `${Auth0Tokens.Auth0Config.toString()} \n${JSON.stringify(
        config(),
        null,
        '  ',
      )}`,
    )

    return {
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        Auth0Module,
      ],
      module: AuthModule,
      providers: [
        {
          provide: Auth0Tokens.Auth0Config,
          useValue: config(),
        },
        JwtStrategy,
        Auth0Service,
      ],
      exports: [PassportModule, Auth0Service],
    }
  }
}
