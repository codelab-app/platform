// MATCH (type:Type {id: $id})
MATCH type = (t:Type {typeKind: "PrimitiveType"})
RETURN type

