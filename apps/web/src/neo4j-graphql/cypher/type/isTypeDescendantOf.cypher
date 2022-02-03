MATCH
  (parentType {id: $parentTypeId})-[r:ARRAY_ITEM_TYPE|UNION_TYPE_CHILD|INTERFACE_FIELD*0..]->
  (descendantType {id: $descendantTypeId})
  WHERE labels(descendantType)[0] ENDS WITH 'Type'
RETURN count(descendantType) > 0 as isDescendant
