MATCH (store:Store)
WHERE store.id in $ids
CALL apoc.path.subgraphAll(
    store,
    { relationshipFilter: 'PARENT_OF_STORE>' }
) YIELD nodes,relationships
WITH nodes,relationships,[n in nodes | n.id] as deletedIds 
CALL apoc.nodes.delete(nodes ,10000) Yield value
Return 
value as nodesDeleted,
deletedIds as deletedIds,
size(relationships) as relationshipsDeleted     