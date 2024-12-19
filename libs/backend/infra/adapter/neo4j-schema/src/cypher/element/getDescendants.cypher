MATCH (rootElement: Element {id: $rootId})
OPTIONAL MATCH (firstChild: Element)-[:TREE_FIRST_CHILD]->(rootElement)

// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  firstChild,
  { relationshipFilter: '<TREE_FIRST_CHILD|<NODE_SIBLING|RENDER_COMPONENT_TYPE>' }
) YIELD nodes AS descendants

// Get isRoot by checking if parent exists
// CALL {
//   WITH element
//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent
// }

// Need to filter out root node
RETURN [node IN descendants WHERE node.id <> rootElement.id], rootElement {.*}
