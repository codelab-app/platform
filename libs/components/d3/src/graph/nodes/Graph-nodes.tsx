import { drag } from 'd3'
import {
  handleClickNode,
  handleDragEndNode,
  handleDragNode,
  handleDragStart,
  handleMouseoutNode,
  handleMouseoverNode,
} from '../Graph-domHandlers'
import { D3Node } from '../Graph.i'
import { g, nodeAttribute } from '../variables/Graph-variables'

/**
 * D3 update methods
 */
export const enterNodes = (selection: any, d3Hooks: any) => {
  /**
   * Group
   */
  selection
    .attr('class', (d: D3Node) => `Node Node--${d.id}`)
    .attr('fill', nodeAttribute('color'))
    .attr('id', (d: D3Node) => `Node--${d.id}`)
  /**
   * Add circle
   */
  selection
    .append('circle')
    .attr('r', nodeAttribute('radius'))
    .attr('class', (d: D3Node) => `Node-circle Node-circle--${d.id}`)
    .style('cursor', 'pointer')
  /**
   * Add text
   */
  selection
    .append('text')
    .text((d: D3Node) => d.label)
    .attr('class', (d: D3Node) => `Node-text Node-text--${d.id}`)
  /**
   * Add dom handlers
   */
  selection
    .on('click', handleClickNode(d3Hooks).bind(selection))
    .on('mouseover', handleMouseoverNode.bind(selection))
    .on('mouseout', handleMouseoutNode.bind(selection))
  /**
   * Drag & Drop
   */
  selection.call(
    drag<any, any>()
      .on('start', handleDragStart.bind(selection))
      .on('drag', handleDragNode.bind(selection))
      .on('end', handleDragEndNode(d3Hooks).bind(selection)),
  )
}
export const updateNodes = (selection: any) => {
  selection
    .select('circle')
    .attr('cx', (d: any) => d.x)
    .attr('cy', (d: any) => d.y)
    .attr('r', nodeAttribute('radius'))

  selection
    .select('text')
    .text((d: D3Node) => d?.label ?? d.id)
    .attr('transform', (d: any) => {
      const x = d.x || g.vertexRadius
      const y = (d.y || -g.vertexRadius) + g.labelOffset

      return `translate(${x - g.vertexRadius},${y + g.vertexRadius})`
    })
}
