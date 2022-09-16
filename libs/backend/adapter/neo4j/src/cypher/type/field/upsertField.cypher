// https://neo4j.com/docs/cypher-manual/current/clauses/merge/#query-merge-relationships
MATCH
  (interfaceType:InterfaceType {id: $interfaceTypeId}),
  (fieldType {id: $fieldTypeId})

// https://stackoverflow.com/questions/28716699/parameter-maps-cannot-be-used-in-merge-patterns/28784921#28784921
// Cannot use param maps

MERGE (interfaceType)-
  [f:INTERFACE_FIELD $where]->
  (fieldType)

// Create extra fields on new node
ON CREATE
  SET
    f.key = $field.key,
    f.name = coalesce($field.name, ""),
    f.description = coalesce($field.description, "")

// Update fields on match
ON MATCH
  SET
    f.key = $field.key,
    f.name = coalesce($field.name, ""),
    f.description = coalesce($field.description, "")

RETURN apoc.map.merge(
  properties(f),
  {source: interfaceType.id, target: fieldType.id}
) as field
