// https://neo4j.com/docs/cypher-manual/current/clauses/merge/#query-merge-relationships
MATCH
  (interfaceType:InterfaceType {id: $interfaceTypeId}),
  (fieldType {id: $fieldTypeId})

// https://stackoverflow.com/questions/28716699/parameter-maps-cannot-be-used-in-merge-patterns/28784921#28784921
// Cannot use param maps
MERGE (interfaceType)-
  [r:INTERFACE_FIELD
    {
      id: $field.id,
      key: $field.key,
      name: coalesce($field.name, ""),
      description: coalesce($field.description, ""),
      validationRules: coalesce($field.validationRules, "")
    }
  ]->(fieldType)

RETURN apoc.map.merge(
  properties(r),
  {source: interfaceType.id, target: fieldType.id}
) as field
