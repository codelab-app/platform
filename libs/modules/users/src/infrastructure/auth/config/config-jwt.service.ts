import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { JwtConfig } from './JwtConfig'

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: JwtConfig.JWT_SECRET,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: JwtConfig.JWT_EXPIRY,
      },
    }
  }
}
