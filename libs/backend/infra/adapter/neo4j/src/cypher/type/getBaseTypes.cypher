MATCH(type:Type)
WITH count(type) - $limit as totalCount

MATCH(type:Type)-[:OWNED_BY]-(owner:User)
RETURN type, owner, totalCount

ORDER by type.id
SKIP $skip
LIMIT $limit
