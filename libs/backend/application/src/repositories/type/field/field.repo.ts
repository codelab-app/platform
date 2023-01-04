import type { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import {
  fieldSelectionSet,
  getDriver,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { connectNode } from '@codelab/shared/data'

export type UpsertFieldProps = {
  input: OGM_TYPES.FieldCreateInput
} & FieldRelationshipProps

interface FieldRelationshipProps {
  interfaceTypeId: string
  fieldTypeId: string
}

export const fieldRepository = {
  upsertField: async ({
    input,
    fieldTypeId,
    interfaceTypeId,
  }: UpsertFieldProps): Promise<void> => {
    console.log('Upsert Field', input)

    const session = getDriver().session()
    const Field = await Repository.instance.Field

    try {
      const existingField = await Field.find({
        where: {
          id: input.id,
        },
        selectionSet: fieldSelectionSet,
      })

      if (!existingField[0]) {
        await Field.create({
          input: [
            {
              ...input,
              fieldType: connectNode(fieldTypeId),
              api: connectNode(interfaceTypeId),
            },
          ],
        })
      } else {
        await Field.update({
          where: {
            id: input.id,
          },
          update: input,
        })
      }
    } finally {
      await session.close()
    }
  },
}
