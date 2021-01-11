import {
  ByEdgeCondition,
  ByEdgeId,
  ByEdgeSource,
  ByEdgeTarget,
  ByGraphCondition,
  ByGraphId,
  ByPageId,
  ByVertexCondition,
  ByVertexId,
} from './QueryConditions'

export const isVertexId = (value: ByVertexCondition): value is ByVertexId => {
  return (value as ByVertexId).vertexId !== undefined
}

export const isGraphId = (value: ByGraphCondition): value is ByGraphId => {
  return (value as ByGraphId).graphId !== undefined
}

export const isPageId = (value: ByGraphCondition): value is ByPageId => {
  return (value as ByPageId).pageId !== undefined
}

export const isEdgeId = (value: ByEdgeCondition): value is ByEdgeId => {
  return (value as ByEdgeId).edgeId !== undefined
}

export const isEdgeSource = (value: ByEdgeCondition): value is ByEdgeSource => {
  return (value as ByEdgeSource).source !== undefined
}

export const isEdgeTarget = (value: ByEdgeCondition): value is ByEdgeTarget => {
  return (value as ByEdgeTarget).target !== undefined
}
