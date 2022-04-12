MATCH (Tag)<-[:CHILDREN]-({ id:$id })

RETURN exist(Tag)
