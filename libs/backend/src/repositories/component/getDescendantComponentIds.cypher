CALL apoc.path.subgraphAll(
  this,
  {
    relationshipFilter: 'COMPONENT_ROOT>|PARENT_OF_ELEMENT>|INSTANCE_OF_COMPONENT>'
  }
) YIELD nodes AS descendants

UNWIND descendants AS descendant
  WITH descendant
    WHERE 'Component' IN LABELS(descendant)

RETURN collect(DISTINCT descendant.id)