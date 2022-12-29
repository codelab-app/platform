MATCH (type:Type)-[:OWNED_BY]-(owner:User)
WHERE type.name CONTAINS $name_CONTAINS

WITH type ORDER BY type.id
WITH collect(type.id) AS typeIds

RETURN apoc.coll.indexOf(typeIds, $id) AS offset