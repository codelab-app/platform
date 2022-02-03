CALL apoc.path.subgraphAll(
  this,
  { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD' }
) YIELD nodes, relationships

RETURN {
  // __resolveType is needed for graphql to recognize the correct concrete type
  // I'm not sure why it doesn't do it automatically, but this seems to work well for now
  vertices:  [node IN nodes | apoc.map.merge(properties(node), {__resolveType: labels(node)[0]})],

  // We collect two 'types' of edges - 1 are the interface fields, which need the field properties.
  // Interface fields result in InterfaceTypeEdge graphql type.
  // And then there's the rest which don't have it. Here we filter out the interface fields and then concatenate them with the rest. They result in a Edge graphql type.
  edges: apoc.coll.union(
      [rel IN relationships WHERE labels(startNode(rel))[0] = 'InterfaceType' |
              apoc.map.merge(properties(rel), { source: startNode(rel).id, target: endNode(rel).id, __resolveType: 'InterfaceTypeEdge'})],
      [rel IN relationships WHERE labels(startNode(rel))[0] <> 'InterfaceType' |
              { source: startNode(rel).id,target: endNode(rel).id, __resolveType: 'Edge' }]
  )
}
