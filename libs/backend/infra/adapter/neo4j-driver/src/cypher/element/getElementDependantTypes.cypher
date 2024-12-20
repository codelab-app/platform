// Find all dependent type nodes that are connected to the starting node
// through various type relationships (array items, interface fields, etc.)
// The search goes up to 10 levels deep in the graph.

// Start from node with given ID
MATCH (element:Element {id: $id})
// Follow type relationships to find dependent types
-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(type)

// Exclude:
// - The starting node itself
// - Basic/primitive types that don't need to be included
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

// Return unique type nodes with their ID and type name
RETURN DISTINCT {
  id: type.id,
  __typename: LAST(labels(type))
}
