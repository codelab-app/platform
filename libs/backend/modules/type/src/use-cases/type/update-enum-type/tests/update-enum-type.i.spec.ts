import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
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
  const testModule = setupTypeTestModule()
  let enumTypeId: string

  beforeAll(async () => {
    enumTypeId = await testModule
      .createTestType(createEnumTypeInput)
      .then((r) => r?.id)
  })

  describe('Guest', () => {
    it('should not update type', async () => {
      await domainRequest<UpdateEnumTypeInput>(
        testModule.guestApp,
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
      const { updateEnumType } = await domainRequest<
        UpdateEnumTypeInput,
        TestUpdateEnumTypeMutation
      >(testModule.userApp, TestUpdateEnumTypeGql, {
        typeId: enumTypeId,
        updateData: updateEnumTypeData,
      })

      const matches = (actual: any) => {
        // New enum values match, old values are excluded
        expect(actual).toMatchObject({
          __typename: 'EnumType',
          id: enumTypeId,
          typeKind: 'EnumType',
          name: updateEnumTypeData.name,
          allowedValues: updateEnumTypeData.allowedValues.map((av) =>
            expect.objectContaining(av),
          ),
        })
      }

      matches(updateEnumType)

      const type = await testModule.getType({ where: { id: enumTypeId } })
      matches(type)
    })
  })
})
