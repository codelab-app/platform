import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Neo4jModule } from '@codelab/backend-infra-adapter/neo4j-driver'
import { Module } from '@nestjs/common'

import { ResolverModule } from '../resolver/resolver.module'
import { SchemaService } from './schema.service'

@Module({
  exports: [SchemaService],
  imports: [Neo4jModule, DigitaloceanModule, ResolverModule],
  providers: [SchemaService],
})
export class GraphQLSchemaModule {}
