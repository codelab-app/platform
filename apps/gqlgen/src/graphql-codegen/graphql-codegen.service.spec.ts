import { Test, TestingModule } from '@nestjs/testing'
import { GraphqlCodegenService } from './graphql-codegen.service'

describe('GraphqlCodegenService', () => {
  let service: GraphqlCodegenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlCodegenService],
    }).compile()

    service = module.get<GraphqlCodegenService>(GraphqlCodegenService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
