import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { EdgeEntity } from '../../../../../../apps/api/graph/src/models/edge/edge.entity'
import { GraphEntity } from '../../../../../../apps/api/graph/src/models/graph/graph.entity'
import { UserEntity } from '../../../../../../apps/api/graph/src/models/user/user.entity'
import { VertexEntity } from '../../../../../../apps/api/graph/src/models/vertex/vertex.entity'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

@Injectable()
export class ConfigTypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const c = this.config

    return {
      type: 'postgres',
      host: this.config.get(ApiConfigTypes.POSTGRES_HOST),
      port: this.config.get(ApiConfigTypes.POSTGRES_E2E_PORT),
      username: this.config.get(ApiConfigTypes.POSTGRES_USER),
      password: this.config.get(ApiConfigTypes.POSTGRES_PASSWORD),
      database: this.config.get(ApiConfigTypes.POSTGRES_DB),
      entities: [UserEntity, GraphEntity, VertexEntity, EdgeEntity],
      synchronize: true,
      dropSchema: true,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
