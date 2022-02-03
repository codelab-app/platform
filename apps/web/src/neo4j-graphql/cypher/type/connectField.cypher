MATCH
  (interfaceType:InterfaceType {id: $interfaceTypeId}),
  (targetType {id: $targetTypeId})
  WHERE labels(targetType)[0] ENDS WITH 'Type'
CREATE (interfaceType)-[r:INTERFACE_FIELD $field]->(targetType)
RETURN apoc.map.merge(properties(r), {source: interfaceType.id, target: targetType.id}) as field
