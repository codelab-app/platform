import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ApiConfig, ApiConfigTypes } from '../config'

@Injectable()
export class ConfigTypeormHasuraService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      host: this.config.get(ApiConfigTypes.POSTGRES_HOST),
      type: 'postgres',
      port: this.config.get(ApiConfigTypes.POSTGRES_PORT),
      username: this.config.get(ApiConfigTypes.POSTGRES_USER),
      password: this.config.get(ApiConfigTypes.POSTGRES_PASSWORD),
      database: this.config.get(ApiConfigTypes.POSTGRES_DB),
      autoLoadEntities: true,
      // synchronize and dropSchema resets the database
      synchronize: this.config.get(ApiConfigTypes.TYPEORM_SYNCHRONIZE),
      dropSchema: this.config.get(ApiConfigTypes.TYPEORM_DROP_SCHEMA),
      logging: ['query', 'error', 'schema'],
      extra: {
        connectionLimit: 5,
      },
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
