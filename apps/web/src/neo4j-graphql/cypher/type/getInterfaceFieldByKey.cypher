MATCH (this {id: $interfaceId}) - [rel:INTERFACE_FIELD {key: $key}] -> ()

RETURN rel
