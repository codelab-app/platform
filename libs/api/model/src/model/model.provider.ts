import { FactoryProvider } from '@nestjs/common'
import { JsonModel, JsonModels } from '@codelab/model'
import { SchemaService } from '../schema'

export const MODELS_PROVIDER = 'MODELS_PROVIDER'

export const modelsProvider: FactoryProvider<JsonModels> = {
  provide: MODELS_PROVIDER,
  useFactory: (schemaService: SchemaService) => {
    return JsonModel.parse(schemaService.jsonSchemaData)
  },
  inject: [SchemaService],
}
