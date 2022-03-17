CALL apoc.path.subgraphAll(
  this,
  { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD' }
) YIELD nodes

RETURN [node in nodes | node.id]
