MATCH (type:Type)
WHERE type.name =~ $name
WITH count(type) as totalCount

MATCH (type:Type)-[:OWNED_BY]-(owner:User)
WHERE type.name =~ $name
RETURN type, owner, totalCount

ORDER by type.name
SKIP $skip
LIMIT $limit
