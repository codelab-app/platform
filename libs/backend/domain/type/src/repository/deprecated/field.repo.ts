import {
  fieldSelectionSet,
  getDriver,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'

export type UpsertFieldProps = {
  input: OGM_TYPES.FieldCreateInput
} & FieldRelationshipProps

interface FieldRelationshipProps {
  interfaceTypeId: string
  fieldTypeId: string
}

export const fieldRepository = {
  upsertField: async (
    { input, fieldTypeId, interfaceTypeId }: UpsertFieldProps,
    where: BaseTypeUniqueWhereCallback<
      OGM_TYPES.FieldCreateInput,
      OGM_TYPES.FieldWhere
    >,
  ): Promise<void> => {
    console.log('Upsert Field', input)

    const session = getDriver().session()
    const Field = await Repository.instance.Field

    try {
      const [existingField] = await Field.find({
        selectionSet: fieldSelectionSet,
        where: where(input),
      })

      if (!existingField) {
        await Field.create({
          input: [
            {
              ...input,
              api: connectNodeId(interfaceTypeId),
              fieldType: connectNodeId(fieldTypeId),
            },
          ],
        })
      } else {
        await Field.update({
          update: { ...input, id: existingField.id },
          where: where(input),
        })
      }
    } finally {
      await session.close()
    }
  },
}
