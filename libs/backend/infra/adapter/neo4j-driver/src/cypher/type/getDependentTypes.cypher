// Get all the types that the current type depend on, excluding system types
// The query will explore specific relationships that are no more than 3 levels deep from current type
// Does not include itself
MATCH (this:Type {id: $id})
-[:ARRAY_ITEM_TYPE|
  INTERFACE_FIELD|
  FIELD_TYPE|
  UNION_TYPE_CHILD*1..10]->(type)

WHERE
  NOT type.id = $id
  AND NOT (
    type:PrimitiveType OR
    type:ReactNodeType OR
    type:CodeMirrorType OR
    type:RichTextType OR
    type:ActionType OR
    type:RenderPropType
  )

RETURN {
  id: type.id,
  // Get the first label that isn't 'Type' to use as the __typename
  // Label order is not guaranteed, https://github.com/neo4j/neo4j/issues/13350
  __typename: [label IN labels(type) WHERE label <> 'Type'][0]
}
