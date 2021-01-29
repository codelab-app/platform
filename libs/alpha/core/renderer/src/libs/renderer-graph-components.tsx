import { FunctionComponent } from 'react'
import { GraphDto } from '../../../../../modules/graph/src/core/domain/graph/GraphDto'
import { convertGraphToTree } from './convertGraphToTree'
import { buildComponents } from './renderer-components'

export interface IGraphData {
  graph: Array<any>
}

//
export const buildComponentsGraph = <P extends {} = {}>(
  data: GraphDto,
): FunctionComponent<P> => {
  return buildComponents(convertGraphToTree(data))
}
