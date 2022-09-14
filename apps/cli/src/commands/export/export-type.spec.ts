import {
  getDriver,
  PrimitiveTypeOGM,
  typeDefs,
  UserOGM,
} from '@codelab/backend/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { OGM } from '@neo4j/graphql-ogm'
import { v4 } from 'uuid'

const ogm = new OGM<OGM_TYPES.ModelMap>({ typeDefs, driver: getDriver() })

describe.skip('Export', () => {
  let PrimitiveType: Awaited<ReturnType<typeof PrimitiveTypeOGM>>
  let User: Awaited<ReturnType<typeof UserOGM>>

  beforeAll(async () => {
    await ogm.init()

    // Create user
    User = ogm.model('User')

    const { users } = await User.create({
      input: [
        {
          auth0Id: v4(),
          email: 'admin@codelab.ai',
          roles: [],
          username: '',
        },
      ],
    })

    const owner = {
      connect: {
        edge: { data: '{}' },
        where: {
          node: {
            id: users[0].id,
          },
        },
      },
    }

    PrimitiveType = await PrimitiveTypeOGM()

    await PrimitiveType.create({
      input: [
        {
          id: v4(),
          kind: ITypeKind.PrimitiveType,
          name: IPrimitiveTypeKind.String,
          primitiveKind: IPrimitiveTypeKind.String,
          owner,
        },
        {
          id: v4(),
          kind: ITypeKind.PrimitiveType,
          name: IPrimitiveTypeKind.Boolean,
          primitiveKind: IPrimitiveTypeKind.Boolean,
          owner,
        },
        {
          id: v4(),
          kind: ITypeKind.PrimitiveType,
          name: IPrimitiveTypeKind.Float,
          primitiveKind: IPrimitiveTypeKind.Float,
          owner,
        },
        {
          id: v4(),
          kind: ITypeKind.PrimitiveType,
          name: IPrimitiveTypeKind.Integer,
          primitiveKind: IPrimitiveTypeKind.Integer,
          owner,
        },
      ],
    })
  })

  it('should create primitive types', async () => {
    const primitiveTypes = await PrimitiveType.find()

    expect(primitiveTypes).toHaveLength(4)
  })
})
