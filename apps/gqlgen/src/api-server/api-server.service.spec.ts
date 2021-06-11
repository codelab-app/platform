import { Test, TestingModule } from '@nestjs/testing'
import { ApiServerService } from './api-server.service'

describe('ApiServerService', () => {
  let service: ApiServerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiServerService],
    }).compile()

    service = module.get<ApiServerService>(ApiServerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
