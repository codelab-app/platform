import { Module } from '@nestjs/common'
import { SchemaService } from './schema.service'

@Module({
  providers: [SchemaService],
})
export class SchemaModule {}
