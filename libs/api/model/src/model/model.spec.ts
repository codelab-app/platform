import { Test } from '@nestjs/testing'
import * as JsonSchema from '@codelab/schema'
import { SchemaModule, JSON_SCHEMA_REPOSITORY } from '../schema'
import { mongooseModelsProvider } from './model.provider'

describe('ModelRepository', () => {
  let jsonSchemaSpy

  beforeEach(async () => {
    jsonSchemaSpy = jest.spyOn(JsonSchema, 'mongooseModels')

    await Test.createTestingModule({
      imports: [SchemaModule],
      providers: [mongooseModelsProvider],
    })
      .overrideProvider(JSON_SCHEMA_REPOSITORY)
      .useValue({})
      .compile()
  })

  it('should call mongooseModels() with the correct argument', () => {
    expect(jsonSchemaSpy).toHaveBeenCalledWith({})
  })
})
