// First find the starting element and all its descendants
MATCH (element:Element {id: $id})
CALL apoc.path.subgraphNodes(element, {
    relationshipFilter: "<TREE_FIRST_CHILD|NODE_SIBLING",
    maxLevel: 10,
    uniqueness: "NODE_GLOBAL"
}) YIELD node as descendant
WHERE descendant:Element

// Then match all APIs connected to these elements
MATCH (descendant)-[:ELEMENT_RENDER_TYPE]->(renderType)
  -[:ATOM_API|COMPONENT_API]->(api:InterfaceType)

// Follow type relationships to find dependent types
CALL apoc.path.subgraphNodes(api, {
  relationshipFilter: "INTERFACE_FIELD>|FIELD_TYPE>|ARRAY_ITEM_TYPE>|UNION_TYPE_CHILD>",
  maxLevel: 10,
  uniqueness: "NODE_GLOBAL"
}) YIELD node AS type

// Don't include `Field` in final results
WHERE NOT 'Field' IN labels(type) 
  AND type <> api  // Exclude the starting API node

// Return unique type nodes with their ID and type name
RETURN DISTINCT {
  // Get the first label that is not 'Type'
  __typename: head([label IN labels(type) WHERE label <> 'Type']),
  id: type.id,
  kind: type.kind,
  name: type.name
}

