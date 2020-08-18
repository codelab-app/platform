import { Module } from '@nestjs/common'
import { modelsProvider, MODELS_PROVIDER } from './model.provider'
import { SchemaModule } from '../schema'

@Module({
  imports: [SchemaModule],
  providers: [modelsProvider],
  exports: [MODELS_PROVIDER],
})
export class ModelModule {}
