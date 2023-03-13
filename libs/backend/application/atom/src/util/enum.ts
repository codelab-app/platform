import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const createEnumTypeInputForAtomType = (
  atomName: string,
  property: string,
  allowValues: Array<string>,
) => ({
  enumType: {
    allowedValues: allowValues.map((value) => ({
      name: compoundCaseToTitleCase(value),
      value,
    })),
  },
  id: v4(),
  kind: ITypeKind.EnumType,
  name: `${atomName} ${compoundCaseToTitleCase(property)} Enum`,
})
