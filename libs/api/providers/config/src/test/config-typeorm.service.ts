import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { CodelabAppEntity } from '../../../../../../apps/api/graph/src/models/app/codelab-app.entity'
import { EdgeEntity } from '../../../../../../apps/api/graph/src/models/edge/edge.entity'
import { GraphEntity } from '../../../../../../apps/api/graph/src/models/graph/graph.entity'
import { PageEntity } from '../../../../../../apps/api/graph/src/models/page/page.entity'
import { UserEntity } from '../../../../../../apps/api/graph/src/models/user/user.entity'
import { VertexEntity } from '../../../../../../apps/api/graph/src/models/vertex/vertex.entity'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

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
        UserEntity,
        GraphEntity,
        VertexEntity,
        EdgeEntity,
        CodelabAppEntity,
        PageEntity,
      ],
      synchronize: true,
      dropSchema: true,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
