// Find all dependent type nodes that are connected to the starting node
// through various type relationships (array items, interface fields, etc.)
// The search goes up to 10 levels deep in the graph.

// Start from element and match its render type (Atom or Component)
MATCH (element:Element {id: $id})-[:ELEMENT_RENDER_TYPE]->(renderType)

// Get the API from either Atom or Component
MATCH (renderType)-[:ATOM_API|COMPONENT_API]->(api:InterfaceType)

// Follow type relationships to find dependent types
MATCH (api)-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(type)

// Exclude:
// - The starting node itself
// - Basic/primitive types that don't need to be included
// WHERE
//   NOT type.id = api.id
//   AND NOT (
//     type:PrimitiveType OR
//     type:ReactNodeType OR
//     type:CodeMirrorType OR
//     type:RichTextType OR
//     type:ActionType OR
//     type:RenderPropType
//   )

// Don't include `Field` in final results
WHERE NOT 'Field' IN labels(type)

// Return unique type nodes with their ID and type name
RETURN DISTINCT {
  // Get the first label that is not 'Type'
  __typename: head([label IN labels(type) WHERE label <> 'Type']),
  id: type.id,
  kind: type.kind,
  name: type.name
}

