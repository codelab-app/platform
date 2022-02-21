MATCH (:InterfaceType {id: $interfaceId})-[rel:INTERFACE_FIELD {key: $key}]->()

DELETE rel

RETURN count(rel) as deletedEdgesCount
