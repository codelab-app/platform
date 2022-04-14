MATCH (a:Atom)
    OPTIONAL MATCH path = (:Atom)-[]-()
    WITH properties(a) AS vertices, [
            relation in relationships(path) |
            {
                name: endNode(relation).name,
                id: endNode(relation).id,
                source: startNode(relation).id,
                type: type(relation)
            }
    ] as relatedNodes

    WITH
            collect(DISTINCT vertices) AS groupedVerticesArrays,
            collect(DISTINCT relatedNodes) AS relatedNodes
    WITH
        apoc.coll.toSet(reduce(accumulator = [], v IN groupedVerticesArrays | accumulator + apoc.map.mergeList([{__typename: "Atom"},v, 
        {tags: [rel IN relatedNodes where rel[0].type='TAGS_WITH' AND rel[0].source=v.id |
                { id:rel[0].id, name: rel[0].name}]}, {api: apoc.map.mergeList([rel IN relatedNodes where rel[0].type="ATOM_API" AND rel[0].source=v.id |
                { id:rel[0].id, name: rel[0].name}])} ]))) AS mergedVertices

        
RETURN mergedVertices AS graph