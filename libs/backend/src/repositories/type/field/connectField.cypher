MATCH
  (interfaceType:InterfaceType {id: $interfaceTypeId}),
  (fieldType {id: $fieldTypeId})

CREATE (interfaceType)-[r:INTERFACE_FIELD $field]->(fieldType)

RETURN apoc.map.merge(
  properties(r),
  {source: interfaceType.id, target: fieldType.id}
) as field
