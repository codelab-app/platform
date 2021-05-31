import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AtomType,
  CreateAtomGql,
  CreateAtomMutationVariables,
} from '@codelab/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AtomModule } from '../../atom.module'

describe('CreateAtom', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule(app, AtomModule)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should create an atom', async () => {
    const variables: CreateAtomMutationVariables = {
      input: {
        label: 'Button (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    await request(app.getHttpServer())
      .send({
        query: print(CreateAtomGql),
        variables,
      })
      .expect(200)
      .expect((res: any) => {
        console.log(res)
      })
  })
})
