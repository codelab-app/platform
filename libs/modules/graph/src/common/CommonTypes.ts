export type FindGraphBy = FindGraphByID

export type FindGraphByID = {
  id: string
}

export type FindEdgeBy = FindEdgeByID | FindEdgeByGraphID

export type FindEdgeByID = {
  id: string
}

export type FindEdgeByGraphID = {
  graph_id: string
}

export type FindVertexBy = FindVertexByID | FindVertexByGraphID

export type FindVertexByID = {
  id: string
}

export type FindVertexByGraphID = {
  graph_id: string
}

export type VertexID = string
