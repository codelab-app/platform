import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ApiConfig, ApiConfigTypes } from '../config'

@Injectable()
export class ConfigTypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get(ApiConfigTypes.POSTGRES_HOST),
      port: this.config.get(ApiConfigTypes.POSTGRES_PORT_E2E),
      username: this.config.get(ApiConfigTypes.POSTGRES_USER),
      password: this.config.get(ApiConfigTypes.POSTGRES_PASSWORD),
      database: this.config.get(ApiConfigTypes.POSTGRES_DB),
      entities: [
        // UserEntity,
        // GraphEntity,
        // VertexEntity,
        // EdgeEntity,
        // CodelabAppEntity,
        // PageEntity,
      ],
      synchronize: true,
      dropSchema: true,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
