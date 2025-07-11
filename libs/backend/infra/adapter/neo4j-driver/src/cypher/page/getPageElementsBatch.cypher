// Batch query to get elements for multiple pages
UNWIND $pageIds AS pageId
MATCH (page:Page {id: pageId})-[:PAGE_ROOT_ELEMENT]-(rootElement:Element)

// For each root Element, get all descendants
CALL apoc.path.subgraphAll(
  rootElement,
  { relationshipFilter: 'TREE_FIRST_CHILD|NODE_SIBLING>|RENDER_COMPONENT_TYPE>' }
) YIELD nodes AS descendants

// Return page ID and all element IDs including root element
RETURN pageId, [node IN descendants | node.id] AS elementIds