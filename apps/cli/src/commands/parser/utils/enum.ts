import { ITypeKind } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const createEnumTypeInputForAtomType = (
  atomName: string,
  property: string,
  allowValues: Array<string>,
) => ({
  id: v4(),
  kind: ITypeKind.EnumType,
  name: `${atomName} ${pascalCaseToWords(property)} Enum`,
  enumType: {
    allowedValues: allowValues.map((value) => ({
      value,
      name: pascalCaseToWords(value),
    })),
  },
})
