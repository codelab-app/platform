MATCH (tags:Tag)

UNWIND tags as tag

// For each Tag, we get all descendants
CALL apoc.path.subgraphAll(
  tag,
  { relationshipFilter: 'CHILDREN' }
) YIELD nodes as descendants

return tag, [node in descendants | node.id]
