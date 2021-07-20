import { ApiResponse, request } from '@codelab/backend'
import {
  __AppFragment,
  CreatePageGql,
  CreatePageMutationResult,
  CreatePageMutationVariables,
  PageBaseFragment,
} from '@codelab/codegen/graphql'
import { createApp } from '@codelab/modules/app-api'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const createPage = async (nestApplication: INestApplication) => {
  const app: __AppFragment = await createApp(nestApplication)

  const variables: CreatePageMutationVariables = {
    input: {
      appId: app.id,
      name: 'Test Page',
    },
  }

  const page: PageBaseFragment = await request(nestApplication.getHttpServer())
    .send({
      query: print(CreatePageGql),
      variables,
    })
    .expect(200)
    .then(
      (res: ApiResponse<CreatePageMutationResult>) =>
        res.body.data?.createPage as PageBaseFragment,
    )

  return {
    app,
    page,
  }
}
