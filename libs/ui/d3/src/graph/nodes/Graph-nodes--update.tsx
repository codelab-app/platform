import { D3Node } from '@codelab/ui/d3'
import { labelOffset, vertexRadius } from '../variables/Graph-variables'
import { NodeSelection } from './Graph-nodes'

export const updateNodes = (selection: NodeSelection) => {
  selection
    .select<SVGGElement>('circle')
    .attr('cx', (d) => d.x ?? 0)
    .attr('cy', (d) => d.y ?? 0)
  // .attr('r', nodeAttribute('radius'))

  selection
    .select('text')
    .text((d: D3Node) => d?.label ?? d.id)
    .attr('transform', (d) => {
      const x = d.x || vertexRadius
      const y = (d.y || -vertexRadius) + labelOffset

      return `translate(${x - vertexRadius},${y + vertexRadius})`
    })
}
