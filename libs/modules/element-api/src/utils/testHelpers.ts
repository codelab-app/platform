import { request } from '@codelab/backend'
import {
  CreateElementGql,
  CreateElementMutation,
  CreateElementMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const createTestElement = async (
  nestApplication: INestApplication,
  name = 'Test Element',
) => {
  const variables: CreateElementMutationVariables = {
    input: {
      name,
    },
  }

  const r = await request(nestApplication.getHttpServer())
    .send({
      query: print(CreateElementGql),
      variables,
    })
    .expect(200)
    .then((res) => (res.body.data as CreateElementMutation)?.createElement)

  return r
}
