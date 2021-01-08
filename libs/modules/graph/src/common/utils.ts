import {
  FindEdgeBy,
  FindEdgeByID,
  FindEdgeBySource,
  FindEdgeByTarget,
  FindGraphBy,
  FindGraphByID,
  FindGraphByPageID,
  FindVertexBy,
  FindVertexByID,
} from './CommonTypes'

export const isVertexId = (value: FindVertexBy): value is FindVertexByID => {
  return (value as FindVertexByID).id !== undefined
}

export const isGraphId = (value: FindGraphBy): value is FindGraphByID => {
  return (value as FindGraphByID).id !== undefined
}

export const isPageId = (value: FindGraphBy): value is FindGraphByPageID => {
  return (value as FindGraphByPageID).pageId !== undefined
}

export const isEdgeId = (value: FindEdgeBy): value is FindEdgeByID => {
  return (value as FindEdgeByID).id !== undefined
}

export const isEdgeSource = (value: FindEdgeBy): value is FindEdgeBySource => {
  return (value as FindEdgeBySource).source !== undefined
}

export const isEdgeTarget = (value: FindEdgeBy): value is FindEdgeByTarget => {
  return (value as FindEdgeByTarget).target !== undefined
}
