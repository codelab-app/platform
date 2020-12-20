export type FindVertexBy = FindVertexByID | FindVertexByGraphID

export type FindVertexByID = {
  id: string
}

export type FindVertexByGraphID = {
  graph_id: string
}
