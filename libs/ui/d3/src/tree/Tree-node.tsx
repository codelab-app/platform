import { HierarchyPointNode, Selection, ValueFn } from 'd3'
import { getNodeColor } from '../graph/nodes/Graph-nodes'
import { D3TreeData } from './tree.interface'

export type D3TreeNode = HierarchyPointNode<D3TreeData>

export type TreeNodeSelection = Selection<
  SVGGElement,
  D3TreeNode,
  any,
  D3TreeNode
>

export const getD3TreeNodeColor: ValueFn<SVGGElement, D3TreeNode, string> = (
  d: D3TreeNode,
) => {
  return getNodeColor(d.data.type)
}

export const updateNode = (selection: TreeNodeSelection) => {
  selection
    .append('circle')
    .attr('fill', getD3TreeNodeColor)
    .attr('cx', (d) => d.x ?? 0)
    .attr('cy', (d) => d.y ?? 0)
    .attr('r', 4)

  selection
    .append('text')
    .attr('dx', (d) => {
      return d.x ?? 0
    })
    .attr('dy', (d) => {
      return (d.y ?? 0) + 15
    })
    .text((d) => {
      return d.data.label ?? ''
    })
}
