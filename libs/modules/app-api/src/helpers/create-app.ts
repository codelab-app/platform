import { ApiResponse, request } from '@codelab/backend'
import {
  CreateAppGql,
  CreateAppMutationResult,
  CreateAppMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const createApp = async (app: INestApplication) => {
  const variables: CreateAppMutationVariables = {
    input: {
      name: 'Test App',
    },
  }

  const createdApp = await request(app.getHttpServer())
    .send({
      query: print(CreateAppGql),
      variables,
    })
    .expect(200)
    .then((res: ApiResponse<CreateAppMutationResult>) => {
      const result = res.body.data?.createApp

      if (!result) {
        throw new Error('No createApp field found')
      }

      return result
    })

  return createdApp.id
}
