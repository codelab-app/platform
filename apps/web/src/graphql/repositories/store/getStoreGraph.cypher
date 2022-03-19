MATCH (rootNode:Store {id: $rootId})
CALL apoc.path.subgraphAll( rootNode, { relationshipFilter: 'PARENT_OF_STORE>' }) 
YIELD nodes, relationships
        
RETURN  [
            rel in relationships |  {
                    source: startNode(rel).id,
                    target: endNode(rel).id,
                    storeKey: properties(rel).storeKey,
            }
       ] as edges