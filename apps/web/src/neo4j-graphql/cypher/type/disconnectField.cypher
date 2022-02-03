MATCH (this:InterfaceType {id: $interfaceId})-[rel:INTERFACE_FIELD {key: $key}]->(n)

DELETE rel

RETURN count(rel) as deletedEdgesCount
