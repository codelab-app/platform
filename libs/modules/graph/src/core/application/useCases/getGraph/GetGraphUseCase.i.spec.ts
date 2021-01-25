import { INestApplication } from '@nestjs/common'
import { GraphModule } from '../../../../framework/nestjs/GraphModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'

describe.skip('GetGraphUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule(app, GraphModule)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
