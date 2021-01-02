import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '../../core/application/services/auth.service'
import { ConfigJwtService } from '../../infrastructure/auth/config/config-jwt.service'
import { JwtStrategy } from '../../infrastructure/auth/strategies/jwt.strategy'

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
