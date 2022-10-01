Match (element:Element {id: $rootId})

// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  element,
  { relationshipFilter: 'TREE_FIRST_CHILD|NODE_SIBLING>|RENDER_COMPONENT_TYPE>' }
) YIELD nodes AS descendants

// Get isRoot by checking if parent exists
// CALL {
//   WITH element
//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent
// }

// Need to filter out root node by getting disjunction
RETURN element {.*},
  apoc.coll.disjunction([node IN descendants | node.id], [element.id])
