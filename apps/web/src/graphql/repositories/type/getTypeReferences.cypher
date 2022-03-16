MATCH (thus)<-[:ARRAY_ITEM_TYPE|INTERFACE_FIELD|UNION_TYPE_CHILD|ATOM_API]-(t)
RETURN {name: t.name, label: labels(t)[0]}
