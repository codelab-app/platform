import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'
import { JwtStrategy } from './jwt.strategy'
import { ConfigJwtService, ConfigModule } from '@codelab/alpha/api/providers/config'

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: ConfigJwtService,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, AuthResolver],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
