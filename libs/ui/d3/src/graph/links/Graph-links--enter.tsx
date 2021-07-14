import { D3Link } from '../Graph.i'
import {
  LINK_LABEL_CLASS,
  LINK_PATH_CLASS,
  LinkHandlers,
  LinkSelection,
} from './Graph-links'

/**
 * Enter link is called once, to initialize the DOM
 */
export const enterLinks = (
  selection: LinkSelection,
  { onClick }: LinkHandlers,
) => {
  /**
   * Group
   */
  selection.attr('class', (d: D3Link) => `Link Link--${d.id}`)

  /**
   * Add link to connect nodes
   */
  selection
    .append('path')
    .attr('class', LINK_PATH_CLASS)
    .attr('id', (d) => `edge_path_${d.id}`)
    .attr('stroke', 'gray')
    .attr('stroke-width', '1px')
    // .attr('fill', 'none')
    .attr('marker-mid', (d: D3Link) => `url(#arrow_${d.id})`)
    .style('cursor', 'pointer')

  /**
   * Append thicker path for easier mouse click
   */
  // selection
  //   .append('path')
  //   .attr('class', 'Link-hover')
  //   .attr('stroke', 'transparent')
  //   .attr('stroke-width', '6px')
  //   .attr('fill', 'none')
  //   .style('cursor', 'pointer')

  /**
   * Add label text
   */
  selection
    .append('text')
    .attr('class', LINK_LABEL_CLASS)
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('dy', 12)
    .attr('fill', 'gray')
    .attr('font-size', 12)
    .style('user-select', 'none')
    .style('cursor', 'pointer')
    .append('textPath')
    // .attr('startOffset', '50%')
    // This will put text above path
    .attr('xlink:href', (d: D3Link) => `#edge_path_${d.id}`)
    .attr('startOffset', '40%')
    .text((d: D3Link) => d.label ?? '')

  /**
   * Add dom handlers
   */
  selection.on('click', (e, link) => {
    if (!onClick) {
      return
    }

    onClick(e, link)
  })
  // selection.on('click', handleClickLink(d3Hooks).bind(selection))
  // .on('mouseover', handleMouseoverLink.bind(selection))
  // .on('mouseout', handleMouseoutLink.bind(selection))
}
