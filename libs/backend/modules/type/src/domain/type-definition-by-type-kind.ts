import { TypeKind } from '@codelab/shared/enums'
import { typeDefinitions } from './type-definitions'

const typeDefinitionByTypeKindMap = new Map(
  typeDefinitions.map((def) => [def.typeKind, def]),
)

export const typeDefinitionByTypeKind = (typeKind: TypeKind) => {
  const def = typeDefinitionByTypeKindMap.get(typeKind)

  if (!def) {
    throw new Error(
      `Unrecognized type kind ${typeKind}. Add it to type-definitions`,
    )
  }

  return def
}
