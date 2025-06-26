// Batch version - Find dependant types for multiple elements
// Takes an array of element IDs and returns dependant types for each
UNWIND $ids AS elementId

// First find each starting element and all its descendants
MATCH (element:Element {id: elementId})
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

// For each type, collect all its related data in subqueries
WITH elementId, type
ORDER BY type.name

// Build the complete type object with all relationships
WITH elementId, type,
  // Get union child types
  CASE WHEN type:UnionType THEN
    [(type)-[:UNION_TYPE_CHILD]->(unionChild) | {
      __typename: head([label IN labels(unionChild) WHERE label <> 'Type']),
      id: unionChild.id,
      kind: unionChild.kind,
      name: unionChild.name
    }]
  END AS typesOfUnion,
  
  // Get array item type
  CASE WHEN type:ArrayType THEN
    [(type)-[:ARRAY_ITEM_TYPE]->(itemType) | {
      __typename: head([label IN labels(itemType) WHERE label <> 'Type']),
      id: itemType.id,
      kind: itemType.kind,
      name: itemType.name
    }][0]
  END AS itemType,
  
  // Get interface fields
  CASE WHEN type:InterfaceType THEN
    [(type)-[:INTERFACE_FIELD]->(field:Field) | {
      id: field.id,
      key: field.key,
      name: field.name,
      description: field.description,
      validationRules: field.validationRules,
      defaultValues: field.defaultValues,
      fieldType: [(field)-[:FIELD_TYPE]->(fieldType) | {
        __typename: head([label IN labels(fieldType) WHERE label <> 'Type']),
        id: fieldType.id,
        kind: fieldType.kind,
        name: fieldType.name
      }][0]
    }]
  END AS fields

// Return the complete type information with all Cypher-computed properties
RETURN elementId, COLLECT(DISTINCT 
  // Merge all type properties dynamically based on labels
  type {
    __typename: head([label IN labels(type) WHERE label <> 'Type']),
    .id,
    .kind,
    .name,
    primitiveKind: CASE WHEN type:PrimitiveType THEN type.primitiveKind END,
    language: CASE WHEN type:CodeMirrorType THEN type.language END,
    allowedValues: CASE WHEN type:EnumType THEN type.allowedValues END,
    itemType: itemType,
    typesOfUnion: typesOfUnion,
    fields: fields
  }
) AS types