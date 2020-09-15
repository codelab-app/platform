import { FactoryProvider } from '@nestjs/common'
import { SchemaService } from '../schema'
import { JsonModel, JsonModels } from '@codelab/core/model'

export const MODELS_PROVIDER = 'MODELS_PROVIDER'

export const modelsProvider: FactoryProvider<JsonModels> = {
  provide: MODELS_PROVIDER,
  useFactory: (schemaService: SchemaService) => {
    return JsonModel.parse(schemaService.jsonSchemaData)
  },
  inject: [SchemaService],
}
