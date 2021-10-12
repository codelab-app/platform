import { SingularElementArgument } from 'cytoscape'
import { getCyElementData } from './element'

export const getEdgeOrder = (edge?: SingularElementArgument) =>
  getCyElementData(edge)?.order ?? 0
