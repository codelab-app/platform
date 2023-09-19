// Get all types that the current type id depends on
// Includes fields, array/union types etc
//
// Does not include itself
MATCH (this {id: $id})
<-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|UNION_TYPE_CHILD*1..3]-(t)
WHERE NOT t.id = $id
RETURN {id: t.id, label: labels(t)[0]}
