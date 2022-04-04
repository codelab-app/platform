MATCH (rootNode:Store)
WHERE $rootId IS NULL OR rootNode.id = $rootId
CALL apoc.path.subgraphAll( rootNode, { relationshipFilter: 'PARENT_OF_STORE>' }) 
YIELD nodes, relationships
UNWIND relationships as r
WITH collect(r) as rels
RETURN  apoc.coll.toSet([
            rel in rels |  {
                    source: startNode(rel).id,
                    target: endNode(rel).id,
                    storeKey: properties(rel).storeKey
            }
       ]) as edges