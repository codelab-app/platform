MATCH (this {id: $id})
-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(t)
WHERE NOT t.id = $id AND NOT (t:PrimitiveType OR t:ReactNodeType OR t:ActionType OR t:RenderPropType)
RETURN {id: t.id, __typename: LAST(labels(t))}
