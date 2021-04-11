import { Test } from '@nestjs/testing'
import { LambdaService } from './LambdaService'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { InfrastructureModule } from '@codelab/backend'
import { ILambda } from './interfaces/IEventTrigger'

describe('LibraryService', () => {
  let service: LambdaService
  let lambda: ILambda
  let payload: any

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [LambdaService],
    }).compile()

    lambda = {
      id: 'test-lambda-id',
      library_id: 'test-lib-id',
      name: 'lambda-name-test',
      body: `exports.handler = (event, context, callback) => {
			  callback(null, event)
			};`,
    }

    payload = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    }

    service = app.get<LambdaService>(LambdaService)
  })

  afterEach(async () => {
    const deletedLambda = await service.deleteLambda(lambda)

    if (deletedLambda) {
      expect(deletedLambda['$metadata'].httpStatusCode).toEqual(204)
    }

    const deletedBucket = await service.deleteBucket(lambda)
    expect(deletedBucket).toBeDefined()
  })

  it('should create lambda function', async () => {
    const newLambda = await service.createLambda(lambda)

    if (newLambda) {
      expect(newLambda).toBeDefined()
      expect(newLambda.Description).toEqual('lambda-name-test')
      expect(newLambda.FunctionName).toEqual('test-lambda-id')
      expect(newLambda.Handler).toEqual('lambda-name-test.handler')
      expect(newLambda['$metadata'].httpStatusCode).toEqual(201)
    }

    const foundLambda = await service.getLambda(lambda)
    expect(foundLambda).toBeDefined()

    const executeResult = await service.executeLambda(lambda, payload)
    expect(executeResult).toMatchObject({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    })
  })

  it('should delete lambda function', async () => {
    await service.createLambda(lambda)
    await service.deleteLambda(lambda)

    const foundLambda = await service.getLambda(lambda)

    expect(foundLambda).toBeUndefined()
  })

  it('should update lambda function', async () => {
    await service.createLambda(lambda)

    const updatedLambda = {
      ...lambda,
      body: `
			exports.handler = (event, context, callback) => {
				event.key1 = 'updated'
			  	callback(null, event)
			};
			`,
    }

    await service.updateLambda(updatedLambda)

    const foundLambda = await service.getLambda(updatedLambda)
    expect(foundLambda).toBeDefined()

    const executeResult = await service.executeLambda(updatedLambda, payload)
    expect(executeResult).toMatchObject({
      key1: 'updated',
      key2: 'value2',
      key3: 'value3',
    })

    const deletedLambda = await service.deleteLambda(updatedLambda)
  })
})
