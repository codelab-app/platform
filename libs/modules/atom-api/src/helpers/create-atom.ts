import { request } from '@codelab/backend'
import {
  AtomType,
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const createAtom = async (app: INestApplication) => {
  const variables: CreateAtomMutationVariables = {
    input: {
      name: 'Button (Ant Design)',
      type: AtomType.AntDesignButton,
    },
  }

  const r = await request(app.getHttpServer())
    .send({
      query: print(CreateAtomGql),
      variables,
    })
    .expect(200)
    .then((res) => (res.body.data as CreateAtomMutation)?.createAtom)

  return r
}
