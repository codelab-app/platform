//
// Different parameters are injected based on the context.
//
// - `this` is used in graphql @cypher context
// - `$this` is used in JS session driver context
//
// coalesce() returns the first non-null value
//
CALL apoc.path.subgraphAll(
  this,
  { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD' }
) YIELD nodes

RETURN [node in nodes | node.id]
