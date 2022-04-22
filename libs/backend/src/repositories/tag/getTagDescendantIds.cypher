CALL apoc.path.subgraphAll(
  this,
  { relationshipFilter: 'CHILDREN' }
) YIELD nodes

RETURN [node in nodes | node.id]
