import { SingularElementArgument } from 'cytoscape'
import { getElementData } from './element'

export const getEdgeOrder = (edge: SingularElementArgument) =>
  getElementData(edge)?.order ?? 0
