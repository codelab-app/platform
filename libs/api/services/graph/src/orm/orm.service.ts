import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

@Injectable()
export class OrmService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      host: this.config.get(ApiConfigTypes.DB_HOST),
      type: this.config.get(ApiConfigTypes.DB_TYPE),
      port: this.config.get(ApiConfigTypes.DB_PORT),
      username: this.config.get(ApiConfigTypes.DB_USERNAME),
      password: this.config.get(ApiConfigTypes.DB_PASSWORD),
      database: this.config.get(ApiConfigTypes.DB),
      autoLoadEntities: true,
      // synchronize and dropSchema resets the database
      synchronize: this.resetDb,
      dropSchema: this.resetDb,
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
