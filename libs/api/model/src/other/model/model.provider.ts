import { FactoryProvider } from '@nestjs/common'
import { JSONSchema7 } from 'json-schema'
import { Models } from '@codelab/model'
import { JSON_SCHEMA_REPOSITORY } from '../schema/schema.provider'

export const MONGOOSE_MODELS = 'MONGOOSE_MODELS'

export const mongooseModelsProvider: FactoryProvider<Models> = {
  provide: MONGOOSE_MODELS,
  useFactory: (jsonSchemaData: JSONSchema7) => {
    // return mongooseModels(jsonSchemaData)
    return new Map()
  },
  inject: [JSON_SCHEMA_REPOSITORY],
}
