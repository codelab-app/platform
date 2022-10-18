//
// Different parameters are injected based on the context.
//
// - `this` is used in graphql @cypher context
// - `$this` is used in JS session driver context
//
// coalesce() returns the first non-null value
//
// https://neo4j.com/labs/apoc/4.0/graph-querying/expand-subgraph/#expand-subgraph-relationship-filters
//
// >FIELD_TYPE is so we can get the end node of the field
CALL apoc.path.subgraphAll(
  this,
  {
    relationshipFilter: '>ARRAY_ITEM_TYPE|>UNION_TYPE_CHILD|>INTERFACE_FIELD|>FIELD_TYPE',
    labelFilter: '>Type|>Field'
  }
) YIELD nodes

RETURN [node in nodes | node.id]
