import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateLambdaGql,
  CreateLambdaInput,
  CreateLambdaMutation,
  GetLambdaGql,
  GetLambdaQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../get-lambda.input'

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
