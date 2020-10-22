---
path: '/demo'
title: 'Demo'
---

1.  Vertex types:

VertexTypes

- Query
- Filter
- Sort

- Query (label is name if query, like "User List Query")
- Filter(label should be json string like `{"age":{"$gte":12}}`).
- Sort(label should be json string like `{"age":1`)
- Select(label should be array of fields)
- Skip(label should be skip value)

2.  Edge Types:

- Query(connect Models and Queries)
- Filter (connect Queries and Filter, Sort, Select, Skip)

3.  Query Operator enums:
    $regex, $gt, $gte, $lt, $lte, $ne
