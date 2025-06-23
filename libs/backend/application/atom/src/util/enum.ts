import { ITypeKind } from '@codelab/shared-abstract-core'
import { titleCase } from '@codelab/shared-utils'
import { v4 } from 'uuid'

export const createEnumTypeInputForAtomType = (
  atomName: string,
  property: string,
  allowValues: Array<string>,
) => ({
  enumType: {
    allowedValues: allowValues.map((value) => ({
      name: titleCase(value),
      value,
    })),
  },
  id: v4(),
  kind: ITypeKind.EnumType,
  name: `${atomName} ${titleCase(property)} Enum`,
})
