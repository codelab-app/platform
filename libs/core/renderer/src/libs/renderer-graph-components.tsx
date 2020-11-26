import { FunctionComponent } from 'react'
import { convertGraphToTree } from './convertGraphToTree'
import { buildComponents } from './renderer-components'
import { Graph } from '@codelab/state/apollo'

export interface IGraphData {
  graph: Array<Graph>
}

export const buildComponentsGraph = <P extends {} = {}>(
  data: IGraphData,
): FunctionComponent<P> => {
  return buildComponents(convertGraphToTree(data))
}
