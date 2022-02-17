MATCH (parentNode:Element)-[rootLink:PARENT_OF_ELEMENT]->(element:Element {id: $elementId})
CALL apoc.path.subgraphAll(
    element,
<<<<<<< HEAD
    { relationshipFilter: 'PARENT_OF_ELEMENT>|PROPS_OF_ELEMENT>|HOOKS_OF_ELEMENT>|RENDER_ATOM>|COMPONENT_TAGGED_WITH>' }
=======
    { relationshipFilter: 'PARENT_OF_ELEMENT>|PROPS_OF_ELEMENT>|HOOKS_OF_ELEMENT>' }
>>>>>>> 554af699 (feat: use reslovers for elements graph)
) YIELD nodes, relationships

CALL apoc.refactor.cloneSubgraph(
    nodes + [parentNode],
    relationships + [rootLink],
    {
        skipProperties:['id'],
        standinNodes:[[parentNode,parentNode]]
    }
) YIELD input, output as createdNode, error
SET createdNode.id = apoc.create.uuid()
RETURN collect(createdNode.id) as ids
