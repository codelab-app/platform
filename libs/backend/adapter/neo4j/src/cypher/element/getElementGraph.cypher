Match (element:Element {id: $rootId})
// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  element,
  { relationshipFilter: '<TREE_SUB_ROOT|<NODE_SIBLING>|INSTANCE_OF_COMPONENT>' }
) YIELD nodes AS descendants

// Get isRoot by checking if parent exists
// CALL {
//   WITH element
//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent
// }

// Need to filter out root node by getting disjunction
RETURN element {.*},
  apoc.coll.disjunction([node IN descendants | node.id], [element.id])
