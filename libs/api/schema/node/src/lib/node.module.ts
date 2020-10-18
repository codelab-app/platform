import { Module } from '@nestjs/common'
import {
  NODE_SCHEMA_PROVIDER,
  nodeSchemaProvider,
} from './node-schema.provider'

@Module({
  imports: [],
  providers: [nodeSchemaProvider],
  exports: [NODE_SCHEMA_PROVIDER],
})
export class NodeModule {}
