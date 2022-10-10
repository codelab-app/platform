import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { FieldTypeRef } from '../utils/type-predicates'

export const getEnumTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
  values,
}) => {
  const EnumType = await Repository.instance.EnumType

  /**
   * Check if enum has been created already
   */
  const [existingEnum] = await EnumType.find({
    where: {
      AND: [
        {
          name: `${atom.name} ${pascalCaseToWords(field.property)} Enum`,
        },
      ],
    },
  })

  if (!existingEnum) {
    const enumName = `${atom.name} ${pascalCaseToWords(field.property)} Enum`

    console.log(`Creating enum ${enumName}`)

    try {
      const {
        enumTypes: [enumType],
      } = await EnumType.create({
        input: [
          {
            id: v4(),
            name: enumName,
            kind: ITypeKind.EnumType,
            allowedValues: {
              create: values.map((value) => ({
                node: {
                  id: v4(),
                  key: value,
                  value: pascalCaseToWords(value),
                },
              })),
            },
            owner: connectTypeId(userId),
          },
        ],
      })

      if (!enumType) {
        throw new Error('Failed to create enum')
      }

      return {
        existingId: enumType.id,
      }
    } catch (e) {
      console.error(e)
      throw new Error()
    }
  }

  return {
    existingId: existingEnum.id,
  }
}
