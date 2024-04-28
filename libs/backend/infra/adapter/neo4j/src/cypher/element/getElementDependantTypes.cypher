// query searches for nodes that are descendants of node with 'id'
// returning the related nodes found within a depth range of 1 to 10 hops away from the starting node.
MATCH (this {id: $id})
-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|FIELD_TYPE|UNION_TYPE_CHILD*1..10]->(type)
WHERE NOT type.id = $id AND NOT (type:PrimitiveType OR type:ReactNodeType OR type:CodeMirrorType OR type:RichTextType OR type:ActionType OR type:RenderPropType)
RETURN DISTINCT {id: type.id, __typename: LAST(labels(type))}
