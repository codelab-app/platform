import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './infra/auth'
import { auth0Config } from './infra/auth0'

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(auth0Config),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
