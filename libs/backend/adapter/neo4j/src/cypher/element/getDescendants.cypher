Match (element:Element {id: $rootId})

// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  element,
  { relationshipFilter: 'PARENT_OF_ELEMENT>|COMPONENT_RENDER_TYPE>' }
) YIELD nodes AS descendants

// Get isRoot by checking if parent exists
// CALL {
//   WITH element
//   RETURN NOT exists( (:Tag)-[:CHILDREN]->(tag:Tag { id: tag.id }) ) as has_no_parent
// }

// Need to filter out root node
RETURN [node IN descendants WHERE node.id <> element.id], element {.*}
