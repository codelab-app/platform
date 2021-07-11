import { Selection } from 'd3'
import { D3Node } from '../Graph.i'
import { g, nodeAttribute } from '../variables/Graph-variables'

interface NodeHandlers {
  onClick: (...args: any) => any
}

export type NodeSelection = Selection<SVGGElement, D3Node, any, D3Node>

/**
 * D3 update methods
 */
export const enterNodes = (
  selection: NodeSelection,
  { onClick }: NodeHandlers,
) => {
  /**
   * Group
   */
  selection
    .attr('class', (d) => `Node Node--${d.id}`)
    .attr('fill', nodeAttribute('color'))
    .attr('id', (d) => `Node--${d.id}`)
  /**
   * Add circle
   */
  selection
    .append('circle')
    .attr('r', nodeAttribute('radius'))
    .attr('class', (d) => `Node-circle Node-circle--${d.id}`)
    .style('cursor', 'pointer')
  /**
   * Add text
   */
  selection
    .append('text')
    .text((d) => d.label ?? '')
    .attr('class', (d) => `Node-text Node-text--${d.id}`)
  /**
   * Add dom handlers
   */
  selection.on('click', (e, node) => {
    onClick(e, node)
  })
  // .on('mouseover', handleMouseoverNode.bind(selection))
  // .on('mouseout', handleMouseoutNode.bind(selection))
  /**
   * Drag & Drop
   */
  // selection.call(
  //   drag<any, any>()
  //     .on('start')(handleDragStart(selection)
  // .on('drag', handleDragNode.bind(selection))
  // .on('end', handleDragEndNode(d3Hooks).bind(selection)),
  // )
}

export const updateNodes = (selection: NodeSelection) => {
  selection
    .select('circle')
    .attr('cx', (d: any) => d.x)
    .attr('cy', (d: any) => d.y)
  // .attr('r', nodeAttribute('radius'))

  selection
    .select('text')
    .text((d: D3Node) => d?.label ?? d.id)
    .attr('transform', (d: any) => {
      const x = d.x || g.vertexRadius
      const y = (d.y || -g.vertexRadius) + g.labelOffset

      return `translate(${x - g.vertexRadius},${y + g.vertexRadius})`
    })
}
