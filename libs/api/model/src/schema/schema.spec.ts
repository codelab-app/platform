import { Test } from '@nestjs/testing'
import { jsonSchemaRepositoryProvider } from './schema.provider'
import { SchemaService } from './schema.service'

describe('SchemaRepository', () => {
  let schemaServiceSpy

  beforeEach(async () => {
    schemaServiceSpy = jest.spyOn(
      SchemaService.prototype,
      'jsonSchemaData',
      'get',
    )
    await Test.createTestingModule({
      providers: [SchemaService, jsonSchemaRepositoryProvider],
    }).compile()
  })

  it('should call SchemaService.jsonSchemaData', () => {
    expect(schemaServiceSpy).toHaveBeenCalled()
  })
})
