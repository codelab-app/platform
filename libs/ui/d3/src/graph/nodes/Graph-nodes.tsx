import { Selection, ValueFn } from 'd3'
import * as color from 'material-ui-colors'
import { D3Node, NodeType } from '../Graph.i'

export type NodeHandlers = {
  onClick: (...args: any) => any
}

export type NodeSelection = Selection<SVGGElement, D3Node, any, D3Node>

export type NodeAttribute = {
  color: string
  radius: number
  distance: number
}

export const getD3NodeColor: ValueFn<SVGGElement, D3Node, string> = (
  d: D3Node,
) => {
  return getNodeColor(d.type)
}

export const getNodeColor = (type: NodeType | undefined) => {
  switch (type) {
    case NodeType.User:
      return color.blue[500]
    case NodeType.App:
      return color.cyan[500]
    case NodeType.Page:
      return color.green[500]
    case NodeType.Element:
      return color.grey[500]
    case NodeType.Component:
      return color.orange[500]
    case NodeType.Atom:
      return color.pink[500]
    default:
      return color.grey[500]
  }
}
