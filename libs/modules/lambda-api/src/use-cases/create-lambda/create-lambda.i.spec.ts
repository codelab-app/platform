import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { Role } from '@codelab/backend/adapters'
import {
  CreateLambdaGql,
  CreateLambdaMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { LambdaModule } from '../../lambda.module'

describe('CreateLambda', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([LambdaModule], { role: Role.GUEST })
    userApp = await setupTestModule([LambdaModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a lambda', async () => {
      const variables: CreateLambdaMutationVariables = {
        input: {
          name: 'Button Callback',
        },
      }

      await request(guestApp.getHttpServer())
        .send({
          query: print(CreateLambdaGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  // describe('User', () => {
  //   it('should create a lambda', () => {
  //     const result = await createLambda(userApp)
  //   })
  // })
})
