import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { CreateLambdaInput } from '../../create-lambda/create-lambda.input'
import {
  CreateLambdaGql,
  CreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../get-lambda.input'
import { GetLambdaGql, GetLambdaQuery } from './get-lambda.api.graphql'

describe('GetLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getLambdaInput: GetLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })

    const {
      createLambda: { id },
    } = await domainRequest<CreateLambdaInput, CreateLambdaMutation>(
      userApp,
      CreateLambdaGql,
      createLambdaInput,
    )

    getLambdaInput = {
      lambdaId: id,
    }

    expect(id).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a lambda', async () => {
      await domainRequest(guestApp, GetLambdaGql, getLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an existing lambda', async () => {
      const { getLambda } = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        getLambdaInput,
      )

      expect(getLambda).toMatchObject({
        ...createLambdaInput,
        id: getLambdaInput.lambdaId,
      })
    })

    it('should return a null lambda', async () => {
      const getMissingLambdaInput: GetLambdaInput = {
        lambdaId: '0x3a0123',
      }

      const results = await domainRequest<GetLambdaInput, GetLambdaQuery>(
        userApp,
        GetLambdaGql,
        getMissingLambdaInput,
      )

      expect(results.getLambda).toBeNull()
    })
  })
})
