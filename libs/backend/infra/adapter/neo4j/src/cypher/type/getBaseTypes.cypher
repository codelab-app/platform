match(type:Type)
with count(type) - $limit as totalCount

match(type:Type)-[:OWNED_BY]-(owner:User)
return type,owner,totalCount

order by type.id
skip $skip
limit $limit