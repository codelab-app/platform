MATCH (page:Page {id: $pageId})-[:PAGE_ROOT_ELEMENT]-(rootElement:Element)

// For root Element, we get all descendants
CALL apoc.path.subgraphAll(
  rootElement,
  { relationshipFilter: 'TREE_FIRST_CHILD|NODE_SIBLING>|RENDER_COMPONENT_TYPE>' }
) YIELD nodes AS descendants

// Return all nodes including root element
RETURN [node IN descendants | node.id]
