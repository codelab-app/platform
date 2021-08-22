import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  GetTypeGql,
  GetTypeInput,
  GetTypeQuery,
  PrimitiveKind,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import {
  createInterfaceTypeInput,
  createPrimitiveStringInput,
} from './create-type.data'

describe('CreateType', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.USER,
    })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not create type', async () => {
      await domainRequest<CreateTypeInput>(
        guestApp,
        CreateTypeGql,
        createPrimitiveStringInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // TODO add for other types

    it('should create a primitive type', async () => {
      const {
        createType: { id: typeId },
      } = await domainRequest<CreateTypeInput, CreateTypeMutation>(
        userApp,
        CreateTypeGql,
        createPrimitiveStringInput,
      )

      const { getType: type } = await domainRequest<GetTypeInput, GetTypeQuery>(
        userApp,
        GetTypeGql,
        { where: { id: typeId } },
      )

      expect(type).toMatchObject({
        __typename: 'PrimitiveType',
        name: createPrimitiveStringInput.name,
        primitiveKind: PrimitiveKind.String,
      })
    })

    it('should create interface type', async () => {
      const {
        createType: { id: typeId },
      } = await domainRequest<CreateTypeInput, CreateTypeMutation>(
        userApp,
        CreateTypeGql,
        createInterfaceTypeInput,
      )

      const { getType: type } = await domainRequest<GetTypeInput, GetTypeQuery>(
        userApp,
        GetTypeGql,
        { where: { id: typeId } },
      )

      expect(type).toMatchObject({
        __typename: 'InterfaceType',
        name: createInterfaceTypeInput.name,
      })
    })
  })
})
