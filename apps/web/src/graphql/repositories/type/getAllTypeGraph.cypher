MATCH (this)-[r]-() WHERE labels(this)[0] ENDS WITH 'Type' OR labels(this)[0]='EnumTypeValue'

    CALL apoc.path.subgraphAll(
    this,
    { relationshipFilter: 'ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD|ALLOWED_VALUE' }

    ) YIELD nodes, relationships

    WITH DISTINCT(apoc.coll.sortNodes(nodes, 'id')) AS nodes, relationships
    WITH DISTINCT {
    vertices:  [node IN nodes | apoc.map.merge(properties(node), {__resolveType: labels(node)[0], typeKind: labels(node)[0]})],
    edges: apoc.coll.union(
        [rel IN relationships WHERE labels(startNode(rel))[0] = 'InterfaceType' |
                apoc.map.merge(properties(rel), { source: startNode(rel).id, target: endNode(rel).id, __resolveType: 'InterfaceTypeEdge'})],
        [rel IN relationships WHERE labels(startNode(rel))[0] <> 'InterfaceType' |
                { source: startNode(rel).id,target: endNode(rel).id, __resolveType: type(rel), id: rel.id }]
    )
    } AS graph
RETURN collect(graph) as graph
