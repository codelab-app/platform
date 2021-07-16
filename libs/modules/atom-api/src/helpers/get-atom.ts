import { request } from '@codelab/backend'
import {
  GetAtomGql,
  GetAtomQuery,
  GetAtomQueryVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const getAtom = async (app: INestApplication, atomId: string) => {
  const variables: GetAtomQueryVariables = { input: { byId: { atomId } } }

  return await request(app.getHttpServer())
    .send({
      query: print(GetAtomGql),
      variables,
    })
    .expect(200)
    .then((res) => (res.body.data as GetAtomQuery)?.atom)
}
