import { ByPageId } from '@codelab/modules/page'

export type ByGraphCondition = ByGraphId | ByPageId

export type ByGraphConditions = {}

export type ByGraphId = {
  graphId: string
}

export type ByVertexCondition = ByVertexId

export type ByVertexConditions = {}

export type ByVertexId = {
  vertexId: string
}

export type ByEdgeCondition = ByEdgeId | ByEdgeSource | ByEdgeTarget

export type ByEdgeId = {
  edgeId: string
}

export type ByEdgeSource = {
  source: string
}

export type ByEdgeTarget = {
  target: string
}
