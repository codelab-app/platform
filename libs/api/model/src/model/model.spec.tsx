import { Test, TestingModule } from '@nestjs/testing'
import { SchemaModule, SchemaService } from '../schema'
import { MODELS_PROVIDER, modelsProvider } from './model.provider'

const MockSchemaService: jest.Mock<typeof SchemaService> = jest.fn()

Object.defineProperty(MockSchemaService, 'jsonSchemaData', {
  get: jest.fn(() => ({ $id: 'mock-json-schema' })),
  configurable: true,
})

describe('ModelModule', () => {
  let schemaServiceSpy: jest.SpyInstance
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [SchemaModule],
      providers: [modelsProvider],
    })
      .overrideProvider(SchemaService)
      .useValue(MockSchemaService)
      .compile()

    /**
     * TODO: Jest mock type issue
     * @body We want to remove the "as any" cast
     */
    schemaServiceSpy = jest.spyOn(
      MockSchemaService,
      'jsonSchemaData' as any,
      'get',
    )
  })

  it('retrieves a map of Mongoose models', () => {
    const mongooseModels = module.get(MODELS_PROVIDER)

    expect(schemaServiceSpy).toHaveBeenCalled()
  })
})
