import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '../../core/application/services/AuthService'
import { ConfigJwtService } from '../../infrastructure/auth/config/config-jwt.service'
import { JwtStrategy } from '../../infrastructure/auth/strategies/jwt.strategy'

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: ConfigJwtService,
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
