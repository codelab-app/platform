WITH '(?i).*' + $name + '.*' AS name

MATCH (type:Type)
WHERE type.name =~ name
WITH name, count(type) as totalCount

MATCH (type:Type)-[:OWNED_BY]-(owner:User)
WHERE type.name =~ name
RETURN type, owner, totalCount

ORDER by type.name
SKIP CASE WHEN $skip IS NOT NULL THEN $skip ELSE 0 END
LIMIT CASE WHEN $limit IS NOT NULL THEN $limit ELSE 999999 END
