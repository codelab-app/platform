import { getNodeColor, NodeSelection } from '../graph/nodes/Graph-nodes'

export const updateNode = (selection: NodeSelection) => {
  selection
    .append('circle')
    .attr('fill', getNodeColor)
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
    .text((d: any) => {
      return d.data.label
    })
}
