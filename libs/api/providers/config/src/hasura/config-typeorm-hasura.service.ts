import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

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
      synchronize: true,
      dropSchema: false,
      logging: ['query', 'error', 'schema'],
      extra: {
        connectionLimit: 5,
      },
    } as PostgresConnectionOptions
  }

  get resetDb(): boolean {
    const { argv } = process

    return argv.includes('--reset')
  }
}
