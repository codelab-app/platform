MATCH (this {id: $typeId})
  WHERE labels(this)[0] ENDS WITH 'Type'

RETURN {
         id: this.id,
         name: this.name
       } as type
