// `this` refers to current node context
RETURN NOT exists((:Tag)-[:CHILDREN]->({ id: this.id }))
