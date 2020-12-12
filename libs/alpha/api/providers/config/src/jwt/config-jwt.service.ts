import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  JwtModuleOptions,
  JwtOptionsFactory,
} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'
import { ApiConfig, ApiConfigTypes } from '../config'

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.config.get(ApiConfigTypes.JWT_SECRET),
      signOptions: {
        algorithm: 'HS512',
        expiresIn: this.config.get(ApiConfigTypes.JWT_EXPIRY),
      },
    } as JwtModuleOptions
  }
}
