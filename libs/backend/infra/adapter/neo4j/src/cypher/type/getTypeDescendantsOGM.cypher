//
// Different parameters are injected based on the context.
//
// - `this` is used in graphql @cypher context
// - `$this` is used in JS session driver context
//
// coalesce() returns the first non-null value
//

MATCH (type:InterfaceType {id: $id})

CALL apoc.path.subgraphAll(
  type,
  {
    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',
    labelFilter: '>TYPE|>FIELD'
  }
) YIELD nodes

RETURN [node in nodes | { id: node.id, kind: node.kind, name: node.name }]
