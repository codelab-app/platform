// DEPRECATED

MATCH (t:InterfaceType {id: $id})

CALL apoc.path.subgraphAll(
  t,
  { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD|ALLOWED_VALUE' }
) YIELD nodes

UNWIND nodes as node

MATCH (node)-[:OWNED_BY]-(owner)

RETURN node {
    .*,
    owner: [owner{.*}],
    __resolveType: labels(node)[0]
  }

























// RETURN nodes, relationships

// UNWIND nodes AS n

// MATCH (n)-[:OWNED_BY]-(owner)

// FOREACH (n in nodes |
//   CALL apoc.map.merge(
//     n,
//     { owner: 'codelab' }
//   )
//   // MATCH (n)-[:OWNED_BY]-(owner)
// )

// RETURN { node: n, owner: owner } as vertex, relationships


