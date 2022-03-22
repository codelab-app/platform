MATCH (t:Tag)
    OPTIONAL MATCH path = (:Tag)<-[:Children]-(:Tag)
    WITH
        properties(t) as vertices,
        [relation in relationships(path) |
        {
        source: properties(startNode(relation)).id,
        target: properties(endNode(relation)).id
        }
        ] as edges
    WITH
        collect(DISTINCT vertices) as groupedVerticesArrays,
        collect(DISTINCT edges) as groupedEdgesArrays
    WITH
        apoc.coll.toSet(reduce(accumulator = [], v IN groupedVerticesArrays | accumulator + v)) as mergedVertices,
        apoc.coll.toSet(reduce(accumulator = [], e IN groupedEdgesArrays | accumulator + e)) as mergedEdges
RETURN {vertices:mergedVertices, edges:mergedEdges} as graph