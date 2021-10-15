import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../../../../type.module'
import { CreateTypeInput } from '../../create-type'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../create-type/tests/create-type.api.graphql.gen'
import { GetTypeInput } from '../../get-type'
import {
  TestGetTypeGql,
  TestGetTypeQuery,
} from '../../get-type/tests/get-type.api.graphql.gen'
import { UpdateEnumTypeInput } from '../update-enum-type.input'
import {
  TestUpdateEnumTypeGql,
  TestUpdateEnumTypeMutation,
} from './update-enum-type.api.graphql.gen'
import {
  createEnumTypeInput,
  updateEnumTypeData,
} from './update-enum-type.data'

describe('UpdateEnumType', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let enumTypeId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })

    enumTypeId = await domainRequest<CreateTypeInput, TestCreateTypeMutation>(
      userApp,
      TestCreateTypeGql,
      createEnumTypeInput,
    ).then((r) => r.createType?.id)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not update type', async () => {
      await domainRequest<UpdateEnumTypeInput>(
        guestApp,
        TestUpdateEnumTypeGql,
        { typeId: enumTypeId, updateData: updateEnumTypeData },
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    // Regression test for the bug where
    // when adding new enum item it duplicates existing ones in addition
    it('should update enum type', async () => {
      await domainRequest<UpdateEnumTypeInput, TestUpdateEnumTypeMutation>(
        userApp,
        TestUpdateEnumTypeGql,
        { typeId: enumTypeId, updateData: updateEnumTypeData },
      )

      const { getType: type } = await domainRequest<
        GetTypeInput,
        TestGetTypeQuery
      >(userApp, TestGetTypeGql, { where: { id: enumTypeId } })

      // New enum values match, old values are excluded
      expect(type).toEqual({
        __typename: 'EnumType',
        id: enumTypeId,
        typeKind: 'EnumType',
        name: updateEnumTypeData.name,
        allowedValues: expect.arrayContaining(
          updateEnumTypeData.allowedValues.map((av) =>
            expect.objectContaining({
              id: expect.any(String),
              ...av,
            }),
          ),
        ),
      })
    })
  })
})
