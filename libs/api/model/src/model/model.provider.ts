import { mongooseModels, MongooseModels } from '@codelab/schema'
import { FactoryProvider } from '@nestjs/common'
import { JSONSchema7 } from 'json-schema'
import { JSON_SCHEMA_REPOSITORY } from '../schema/schema.provider'

export const MONGOOSE_MODELS = 'MONGOOSE_MODELS'

export const mongooseModelsProvider: FactoryProvider<MongooseModels> = {
  provide: MONGOOSE_MODELS,
  useFactory: (jsonSchemaData: JSONSchema7) => {
    return mongooseModels(jsonSchemaData)
  },
  inject: [JSON_SCHEMA_REPOSITORY],
}
