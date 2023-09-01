
Match (element:Element {id: $elementId})

// For root Element, we get all descendants
CALL apoc.path.subgraphNodes(
  element,
  { 
    relationshipFilter: 'TREE_FIRST_CHILD>|NODE_SIBLING>|<ROOT_PAGE_ELEMENT|<COMPONENT_ROOT',
    labelFilter:'/Component|/Page'
  }
) 
YIELD node

Return node.id as id