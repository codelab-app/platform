import { Test, TestingModule } from '@nestjs/testing'
import { SchemaService } from './schema.service'

describe('SchemaModule', () => {
  let schemaServiceSpy: jest.SpyInstance
  let module: TestingModule

  beforeEach(async () => {
    schemaServiceSpy = jest
      .spyOn(SchemaService.prototype, 'jsonSchemaData', 'get')
      .mockReturnValue({ $id: 'mock-json-schema' })
    module = await Test.createTestingModule({
      providers: [SchemaService],
    }).compile()
  })

  it('should call SchemaService.jsonSchemaData', () => {
    const { jsonSchemaData } = module.get(SchemaService)

    expect(schemaServiceSpy).toHaveBeenCalled()
    expect(jsonSchemaData).toEqual({ $id: 'mock-json-schema' })
  })
})
