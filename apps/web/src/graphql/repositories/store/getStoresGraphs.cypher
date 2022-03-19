MATCH (a:Store)-[rel:PARENT_OF_STORE]->(b:Store)
RETURN collect({
   source:a.id,
   target:b.id,
   storeKey: properties(rel).storeKey
}) as edges
