Match (tag:Tag {id: $rootId})

// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  tag,
  { relationshipFilter: '>CHILDREN' }
) YIELD nodes AS descendants

// Need to filter out root node
RETURN [node IN descendants WHERE node.id <> tag.id], tag {.*}
