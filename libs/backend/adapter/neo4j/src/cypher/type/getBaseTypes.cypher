match(type:Type)-[:OWNED_BY]-(owner:User)
return type,owner

order by type.id
skip $skip
limit $limit