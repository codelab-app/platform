import { DgraphEntityType, DgraphType } from '@codelab/backend/infra'
import { typeDefinitions } from './type-definitions'

export const typeDefinitionByDgraphTypeMap = new Map(
  typeDefinitions.map((def) => [def.dgraphType, def]),
)

export const typeDefinitionByDgraphType = (
  type: DgraphType<DgraphEntityType>,
) => {
  const specificType = type['dgraph.type'].filter(
    (t) => t !== DgraphEntityType.Type,
  )[0]

  const def = typeDefinitionByDgraphTypeMap.get(specificType)

  if (!def) {
    throw new Error(
      `Unrecognized dgraph type ${type['dgraph.type']}. Add it to type-definitions`,
    )
  }

  return def
}
