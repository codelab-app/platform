Match (store:Store {id: $rootId})

// For root Store, we get all descendants
CALL apoc.path.subgraphAll(
  store,
  { relationshipFilter: 'PARENT_OF_STORE>' }
) YIELD nodes AS descendants


RETURN store {.*},
  apoc.coll.disjunction([node IN descendants | node.id], [store.id])
