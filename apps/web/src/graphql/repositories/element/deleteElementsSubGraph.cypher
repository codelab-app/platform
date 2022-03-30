MATCH (element:Element)
WHERE element.id in $ids
CALL apoc.path.subgraphAll(
    element,
    { relationshipFilter: 'PARENT_OF_ELEMENT>|PROPS_OF_ELEMENT>|BIND_PROPS_TO_ELEMENT>|HOOKS_OF_ELEMENT>' }
) YIELD nodes,relationships
WITH nodes,relationships,[n in nodes | n.id] as deletedIds 
CALL apoc.nodes.delete(nodes ,10000) Yield value
Return 
value as nodesDeleted,
deletedIds as deletedIds,
size(relationships) as relationshipsDeleted 