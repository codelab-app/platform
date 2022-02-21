CALL apoc.path.subgraphAll(
  this,
  { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD' }
) YIELD nodes, relationships

RETURN {
  vertices:  [node IN nodes | apoc.map.merge(properties(node), {__resolveType: labels(node)[0]})],
  edges: apoc.coll.union(
      [rel IN relationships WHERE labels(startNode(rel))[0] = 'InterfaceType' |
              apoc.map.merge(properties(rel), { source: startNode(rel).id, target: endNode(rel).id, __resolveType: 'InterfaceTypeEdge'})],
      [rel IN relationships WHERE labels(startNode(rel))[0] <> 'InterfaceType' |
              { source: startNode(rel).id,target: endNode(rel).id, __resolveType: 'Edge' }]
  )
} as graph
