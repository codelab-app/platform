import { updateNodes } from './nodes/Graph-nodes'
import { updateLinks } from './links/Graph-links'

export const defineMarkers = (selection: any) => {
  selection
    .attr('class', 'arrow')
    .attr('id', (d: any) => `arrow_${d.id}`)
    .attr('viewBox', '0 0 12 16')
    .attr('refX', 6)
    .attr('refY', 8)
    .attr('markerWidth', 12)
    .attr('markerHeight', 16)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M2,2 L14,8 L2,14 L8,8 L2,2')
    .attr('fill', 'gray')
}

/**
 * Use function for this context, allow func style since this is used
 */
// eslint-disable-next-line func-style
export function ticked(this: any): any {
  updateNodes(this.d3Nodes)
  updateLinks(this.d3Links)
}
