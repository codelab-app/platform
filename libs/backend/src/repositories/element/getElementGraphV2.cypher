MATCH (rootNode:Element {id: $rootId})
CALL apoc.path.subgraphAll(
  rootNode,
  { relationshipFilter: 'PARENT_OF_ELEMENT>|INSTANCE_OF_COMPONENT>|COMPONENT_ROOT<' }
) YIELD nodes, relationships

RETURN [
  rel in relationships |
  {
    source: startNode(rel).id,
    target: endNode(rel).id,
    order: properties(rel).order,
    type: type(rel)
  }
] as edges
