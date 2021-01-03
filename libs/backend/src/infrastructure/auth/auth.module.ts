import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ConfigJwtService } from './config/config-jwt.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: ConfigJwtService,
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
