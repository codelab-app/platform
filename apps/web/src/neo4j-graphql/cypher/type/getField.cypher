MATCH (i:InterfaceType {id: $interfaceId})-[rel:INTERFACE_FIELD {key: $key}]->(t)
RETURN apoc.map.merge(properties(rel), {source: i.id, target: t.id}) as field
