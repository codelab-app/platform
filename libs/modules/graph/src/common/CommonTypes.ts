/* eslint-disable camelcase */

// Find Graph
export type GraphID = string

export type FindGraphBy = FindGraphByID | FindGraphByPageID

export type FindGraphByID = {
  id: GraphID
}

export type FindGraphByPageID = {
  pageId: string
}

// Find Vertex
export type VertexID = string

export type FindVertexBy = FindVertexByID

export type FindVertexByID = {
  id: VertexID
}

// Find Edge
export type EdgeID = string

export type FindEdgeBy = FindEdgeByID | FindEdgeBySource | FindEdgeByTarget

export type FindEdgeByID = {
  id: EdgeID
}

export type FindEdgeBySource = {
  source: VertexID
}

export type FindEdgeByTarget = {
  target: VertexID
}
