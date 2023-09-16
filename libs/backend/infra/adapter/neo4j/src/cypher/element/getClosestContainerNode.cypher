MATCH (this:Element)

// For root Element, we get all descendants
CALL apoc.path.subgraphNodes(
  element,
  {
    relationshipFilter: 'TREE_FIRST_CHILD>|NODE_SIBLING>|<ROOT_PAGE_ELEMENT|<COMPONENT_ROOT',
    labelFilter:'/Component|/Page'
  }
)
YIELD node

RETURN node
