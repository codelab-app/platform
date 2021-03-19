import { VertexType } from '@prisma/client'
import { List, fromJS } from 'immutable'
import { JSONSchema7 } from 'json-schema'

const vertexCompatibilityMap: Record<string, Array<VertexType>> = {
  [VertexType.React_Grid_Row]: [VertexType.React_Grid_Col],
}

export const filterAddChildVertexInputSchema = (
  parentVertexType: string,
  schema: JSONSchema7,
): JSONSchema7 => {
  const immutableSchema = fromJS(schema)
  const path = [
    'definitions',
    'CreateVertexInput',
    'properties',
    'type',
    'enum',
  ]
  const possibleTypes = immutableSchema.getIn(path)

  if (!List.isList(possibleTypes)) {
    return schema
  }

  const compatibleTypes = vertexCompatibilityMap[parentVertexType]

  const filteredVerticesTypes =
    compatibleTypes ?? false
      ? compatibleTypes.filter((t) => possibleTypes.includes(t))
      : possibleTypes

  return immutableSchema.setIn(path, filteredVerticesTypes).toJS()
}
