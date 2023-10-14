// Get all the types that the current type depend on, excluding system types
// The query will explore specific relationships that are no more than 3 levels deep from current type
// Does not include itself
MATCH (this {id: $id})
-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(t)
WHERE NOT t.id = $id AND NOT (t:PrimitiveType OR t:ReactNodeType OR t:ActionType OR t:RenderPropType)
RETURN {id: t.id, __typename: LAST(labels(t))}
