// Operation: GetElementDependantTypes
// First find the starting element and all its descendants
MATCH (element:Element {id: $id})
CALL apoc.path.subgraphNodes(element, {
  relationshipFilter: "<TREE_FIRST_CHILD|NODE_SIBLING>"
})
YIELD node as descendant
WHERE descendant:Element

// Then match all APIs connected to these elements
MATCH (descendant)-[:ELEMENT_RENDER_TYPE]->(renderType)
  -[:ATOM_API|COMPONENT_API]->(api:InterfaceType)

// Follow type relationships to find dependent types
CALL apoc.path.subgraphNodes(api, {
  relationshipFilter: "INTERFACE_FIELD>|FIELD_TYPE>|ARRAY_ITEM_TYPE>|UNION_TYPE_CHILD>",
  maxLevel: 10
})
YIELD node AS type

// Don't include `Field`, starting node and Basic/primitive types in final results
WHERE NOT type.id = api.id
  AND NOT (
    type:Field OR
    type:PrimitiveType OR
    type:ReactNodeType OR
    type:CodeMirrorType OR
    type:RichTextType OR
    type:ActionType OR
    type:RenderPropType
  )

// Return unique type nodes with their ID and type name
RETURN DISTINCT {
  // Get the first label that is not 'Type'
  __typename: head([label IN labels(type) WHERE label <> 'Type']),
  id: type.id,
  kind: type.kind,
  name: type.name
}
