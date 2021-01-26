import { FunctionComponent } from 'react'
import { convertGraphToTree } from './convertGraphToTree'
import { buildComponents } from './renderer-components'

export interface IGraphData {
  graph: Array<any>
}

export const buildComponentsGraph = <P extends {} = {}>(
  data: IGraphData,
): FunctionComponent<P> => {
  return buildComponents(convertGraphToTree(data))
}
