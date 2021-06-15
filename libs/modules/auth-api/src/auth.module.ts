import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { Auth0Service } from './auth0'
import { Auth0Config } from './config/auth.config'
import { JwtStrategy } from './strategy/jwt.strategy'

@Global()
@Module({})
export class AuthModule {
  static register(config: ConfigFactory<Auth0Config>): DynamicModule {
    return {
      imports: [
        ConfigModule.forFeature(config),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      module: AuthModule,
      providers: [JwtStrategy, Auth0Service],
      exports: [PassportModule, Auth0Service],
    }
  }
}
