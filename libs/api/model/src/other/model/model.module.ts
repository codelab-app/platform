import { Module } from '@nestjs/common'
import { mongooseModelsProvider, MONGOOSE_MODELS } from './model.provider'
import { SchemaModule } from '../schema/schema.module'

@Module({
  imports: [SchemaModule],
  providers: [mongooseModelsProvider],
  exports: [MONGOOSE_MODELS],
})
export class ModelModule {}
