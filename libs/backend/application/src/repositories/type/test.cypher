match(type:Type)-[:OWNED_BY]-(owner:User)
optional match (type)-[:UNION_TYPE_CHILD]->(unionTypes:Type)
optional match (type)-[:ALLOWED_VALUE]->(allowedValues:EnumTypeValue)
return type,owner,collect(unionTypes),collect(allowedValues)
skip $skip
limit $limit