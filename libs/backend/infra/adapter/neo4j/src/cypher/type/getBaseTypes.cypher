CALL apoc.cypher.run(
  '
  MATCH (type:Type)
  WHERE type.name =~ $name
  WITH count(type) as totalCount

  MATCH (type:Type)-[:OWNED_BY]-(owner:User)
  WHERE type.name =~ $name
  RETURN type, owner, totalCount
  ORDER by type.name
  '
  + CASE WHEN $skip IS NOT NULL THEN ' SKIP $skip' ELSE '' END
  + CASE WHEN $limit IS NOT NULL THEN ' LIMIT $limit'  ELSE '' END,
  { name: '(?i).*' + $name + '.*', skip: $skip, limit: $limit }
) yield value

RETURN value.type as type, value.owner as owner, value.totalCount as totalCount
