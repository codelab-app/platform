import { Injectable } from '@nestjs/common'
import {
  JwtModuleOptions,
  JwtOptionsFactory,
} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'
import { JwtConfig } from '@codelab/backend'

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: JwtConfig.JWT_SECRET,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: JwtConfig.JWT_EXPIRY,
      },
    } as JwtModuleOptions
  }
}
