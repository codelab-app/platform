import { EnumTypeOGM } from '@codelab/backend/adapter/neo4j'
import {
  AntdDesignApi,
  IAtomImport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'

type TypeRef = {
  existingId: string
} | null

export const getEnumTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomImport,
  userId: string,
  values: Array<string>,
): Promise<TypeRef> => {
  const EnumType = await EnumTypeOGM()

  const [existingEnum] = await EnumType.find({
    where: {
      AND: [
        {
          name: `${atom.name} ${pascalCaseToWords(apiField.property)} Enum API`,
        },
      ],
    },
  })

  if (!existingEnum) {
    const enumName = `${atom.name} ${pascalCaseToWords(
      apiField.property,
    )} Enum API`

    console.log(`Creating enum ${enumName}`)

    const {
      enumTypes: [enumType],
    } = await EnumType.create({
      input: [
        {
          id: v4(),
          name: enumName,
          kind: ITypeKind.EnumType,
          allowedValues: {
            create: values.map((value: string) => ({
              node: {
                id: v4(),
                value,
                name: pascalCaseToWords(value),
              },
            })),
          },
          owner: connectTypeId(userId),
        },
      ],
    })

    return {
      existingId: enumType.id,
    }
  }

  return {
    existingId: existingEnum.id,
  }
}
