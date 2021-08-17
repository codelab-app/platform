import { getElementData } from '@codelab/shared/core'
import { SingularElementArgument } from 'cytoscape'

export const getEdgeOrder = (edge: SingularElementArgument) =>
  getElementData(edge)?.order ?? 0
