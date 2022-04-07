MATCH (tags:Tag)

UNWIND tags AS tag

// For each Tag, we get all descendants
CALL apoc.path.subgraphAll(
  tag,
  { relationshipFilter: '>CHILDREN' }
) YIELD nodes AS descendants

// Get isRoot by checking if parent exists
CALL {
  WITH tag
  RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent
}

// Need to filter out root node by getting disjunction
RETURN tag {.*, isRoot: has_no_parent }, apoc.coll.disjunction([node IN descendants | node.id], [tag.id])
