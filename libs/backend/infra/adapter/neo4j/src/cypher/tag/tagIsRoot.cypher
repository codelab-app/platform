RETURN NOT exists((:Tag)-[:CHILDREN]->({ id: $this.id }))
