// Can inject parameter from CLI
//
// :param typeProps => ({ name: "string", typeKind: "PrimitiveType", primitiveKind: "String" })
//
MERGE (type:Type { typeKind: $typeProps.typeKind }) set type += $typeProps
