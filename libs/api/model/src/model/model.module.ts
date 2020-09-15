import { Module } from '@nestjs/common'
import { SchemaModule } from '../schema'
import { MODELS_PROVIDER, modelsProvider } from './model.provider'

@Module({
  imports: [SchemaModule],
  providers: [modelsProvider],
  exports: [MODELS_PROVIDER],
})
export class ModelModule {}
