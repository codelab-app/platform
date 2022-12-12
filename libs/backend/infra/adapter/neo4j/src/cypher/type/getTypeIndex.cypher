// Returns index of type with id typeId
MATCH (type:Type)
WITH type ORDER by type.id
WITH COLLECT(type) AS types
MATCH (selectedType:Type {id:$typeId})-[:OWNED_BY]-(owner:User)
RETURN
  REDUCE(index = -1, i IN RANGE(0, SIZE(types)-1) | CASE types[i].id WHEN $typeId THEN i ELSE index END) AS index, selectedType, owner;
