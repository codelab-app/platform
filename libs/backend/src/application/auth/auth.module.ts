import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { authConfig } from './config/authConfig'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
