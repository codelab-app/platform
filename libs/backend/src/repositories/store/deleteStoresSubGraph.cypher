MATCH (store:Store)

WHERE store.id in $ids

CALL apoc.path.subgraphAll(
    store,
    { relationshipFilter: 'PARENT_OF_STORE>|ACTION_OF_STORE>|STATE_OF_STORE>' }
) YIELD nodes,relationships
WITH nodes, relationships, [n in nodes | n.id] AS deletedIds

CALL apoc.nodes.delete(nodes ,10000) Yield value

RETURN
  value AS nodesDeleted,
  deletedIds AS deletedIds,
  size(relationships) AS relationshipsDeleted
