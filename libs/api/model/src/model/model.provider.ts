import { FactoryProvider } from '@nestjs/common'
import { Model, Models } from '@codelab/model'
import { SchemaService } from '../schema'

export const MODELS_PROVIDER = 'MODELS_PROVIDER'

export const modelsProvider: FactoryProvider<Models> = {
  provide: MODELS_PROVIDER,
  useFactory: (schemaService: SchemaService) => {
    return Model.parse(schemaService.jsonSchemaData)
  },
  inject: [SchemaService],
}
