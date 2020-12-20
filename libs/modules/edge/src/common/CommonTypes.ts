export type FindEdgeBy = FindEdgeByID | FindEdgeByGraphID

export type FindEdgeByID = {
  id: string
}

export type FindEdgeByGraphID = {
  graph_id: string
}
