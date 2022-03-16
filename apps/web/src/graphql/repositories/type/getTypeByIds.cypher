MATCH (this)
  WHERE labels(this)[0] ENDS WITH 'Type' AND this.id IN $typeIds

RETURN {
  id: this.id,
  name: this.name
} as types
