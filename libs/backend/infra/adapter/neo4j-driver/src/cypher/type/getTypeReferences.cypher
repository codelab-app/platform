// Returns a list of all Type and Atom entities that reference the type with the given id
//
// This could be different types of relationships like
//
// - Atom-Api
// - ArrayType-itemType
// - InterfaceType-field
// - UnionType-unionTypeChild
//
MATCH (this {id: $typeId})<-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|UNION_TYPE_CHILD|ATOM_API]-(t)
RETURN {name: t.name, label: labels(t)[0]}
