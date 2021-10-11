import {
  AwsConfig,
  awsConfig,
  AwsS3Service,
  AwsTokens,
  domainRequest,
} from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { LambdaModule } from '../../../lambda.module'
import { CreateLambdaInput } from '../../create-lambda'
import {
  TestCreateLambdaGql,
  TestCreateLambdaMutation,
} from '../../create-lambda/tests/create-lambda.api.graphql.gen'
import { createLambdaInput } from '../../create-lambda/tests/create-lambda.data'
import { GetLambdaInput } from '../../get-lambda'
import {
  TestGetLambdaGql,
  TestGetLambdaQuery,
} from '../../get-lambda/tests/get-lambda.api.graphql.gen'
import { DeleteLambdaInput } from '../delete-lambda.input'
import {
  TestDeleteLambdaGql,
  TestDeleteLambdaMutation,
} from './delete-lambda.api.graphql.gen'

describe('DeleteLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let deleteLambdaInput: DeleteLambdaInput

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.Guest })
    userApp = await setupTestModule([LambdaModule], { role: Role.User })

    const awsS3Service = userApp.get<AwsS3Service>(AwsTokens.S3)
    const _awsConfig = userApp.get<AwsConfig>(awsConfig.KEY)
    await awsS3Service.emptyBucket(_awsConfig.awsBucketName)

    const { createLambda } = await domainRequest<
      CreateLambdaInput,
      TestCreateLambdaMutation
    >(userApp, TestCreateLambdaGql, createLambdaInput)

    deleteLambdaInput = {
      lambdaId: createLambda.id,
    }

    expect(createLambda.id).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete a lambda', async () => {
      await domainRequest(guestApp, TestDeleteLambdaGql, deleteLambdaInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete a lambda', async () => {
      const getLambdaInput: GetLambdaInput = {
        lambdaId: deleteLambdaInput.lambdaId,
      }

      const { deleteLambda } = await domainRequest<
        DeleteLambdaInput,
        TestDeleteLambdaMutation
      >(userApp, TestDeleteLambdaGql, deleteLambdaInput)

      expect(deleteLambda?.id).toEqual(deleteLambda?.id)

      const { getLambda } = await domainRequest<
        GetLambdaInput,
        TestGetLambdaQuery
      >(userApp, TestGetLambdaGql, getLambdaInput)

      expect(getLambda).toBeNull()
    })
  })
})
