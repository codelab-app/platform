import { NodeHandlers } from '../graph.interface'
import { getD3NodeColor, NodeSelection } from './Graph-nodes'

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
    .attr('fill', getD3NodeColor)
    .attr('id', (d) => `Node--${d.id}`)

  /**
   * Add circle
   */
  selection
    .append('circle')
    .attr('r', 10)
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
    // onClick(e, node)
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
