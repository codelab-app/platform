CALL apoc.path.subgraphAll(
  this,
  {
    relationshipFilter: 'INSTANCE_OF_COMPONENT|TREE_SUB_ROOT|NODE_SIBLING|COMPONENT_ROOT'
  }
) YIELD nodes AS descendants

UNWIND descendants AS descendant
  WITH descendant
    WHERE 'Component' IN LABELS(descendant)

RETURN collect(DISTINCT descendant.id)
