import { fieldRepository } from '@codelab/backend/application'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { upsertType } from '../../../repository/type.repo'
import { interfaceTypeParser } from '../parser/interface-type-parser'
import { getTypeForApi } from '../type-map'
import { FieldTypeRef } from '../utils/type-predicates'

/**
 * Same file because interface has nested types that need resolution
 */
export const getInterfaceTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
}) => {
  console.log('InterfaceTypeForApi', field, atom)

  const interfaceType = await upsertType(
    {
      id: v4(),
      __typename: ITypeKind.InterfaceType,
      kind: ITypeKind.InterfaceType,
      name: `${atom.name} ${compoundCaseToTitleCase(field.property)} API`,
      fields: [],
    },
    userId,
    (type) => ({ name: type.name }),
  )

  if (!interfaceType) {
    throw new Error('InterfaceType not found')
  }

  const fields = interfaceTypeParser(field.type)

  for await (const [key, value] of fields) {
    const existingType = await getTypeForApi(
      {
        type: value,
        property: key,
      },
      atom,
      userId,
    )

    if (!existingType) {
      continue
    }

    await fieldRepository.upsertField({
      input: {
        id: v4(),
        key,
      },
      interfaceTypeId: interfaceType.id,
      fieldTypeId: existingType.existingId,
    })
  }

  return {
    existingId: interfaceType.id,
  }
}
