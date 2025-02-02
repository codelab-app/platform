MATCH (type:Type)
WHERE type.name =~ $name OR isEmpty($name)
WITH count(type) AS totalCount, $name AS name

MATCH (type:Type)-[:OWNED_BY]-(owner:User)
WHERE type.name =~ name OR isEmpty($name)
RETURN type, owner, totalCount

ORDER BY type.name
SKIP $skip
LIMIT $limit
