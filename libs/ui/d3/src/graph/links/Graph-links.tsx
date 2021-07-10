import { Selection } from 'd3'
import { D3Link } from '../Graph.i'

interface LinkHandlers {
  onClick: (...args: any) => any
}

export const enterLinks = (
  selection: Selection<any, any, any, any>,
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
    .attr('class', 'Link-path')
    .attr('stroke', 'gray')
    .attr('stroke-width', '1px')
    .attr('fill', 'none')
    .attr('marker-mid', (d: D3Link) => `url(#arrow_${d.id})`)
    .style('cursor', 'pointer')

  /**
   * Append thicker path for easier mouse click
   */
  selection
    .append('path')
    .attr('class', 'Link-hover')
    .attr('stroke', 'transparent')
    .attr('stroke-width', '6px')
    .attr('fill', 'none')
    .style('cursor', 'pointer')

  /**
   * Add label text
   */
  selection
    .append('text')
    .attr('class', 'Link-label')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('dy', 16)
    .attr('fill', 'gray')
    .attr('font-size', 12)
    .style('user-select', 'none')
    .style('cursor', 'pointer')
    .append('textPath')
    .attr('startOffset', '50%')
    .attr('xlink:href', (d: D3Link) => `#edge_path_${d.id}`)
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

export const updateLinks = (selection: any, links = []) => {
  const addEdge = (d: any) => {
    // TODO
    // if (!has(d, 'target.id')) return ''

    const divider = d.biDirection ? 1 / 2 : 0
    const [dX, dY] = [d.target.x - d.source.x, d.target.y - d.source.y]

    const [x1, y1, x2, y2] = [
      d.source.x + dX * divider,
      d.source.y + dY * divider,
      d.target.x,
      d.target.y,
    ]

    const dx = x2 - x1
    const dy = y2 - y1

    return `M${x1},${y1} L${x1 + dx / 2},${y1 + dy / 2}  L${x2},${y2}`
  }

  const updateEdgeLabel = (d: any, i: number, elements: Array<any>) => {
    if (d?.target?.id) {
      return ''
    }

    const { x, y, width, height } = elements[i].getBBox()

    const rotate =
      d.target.x < d.source.x
        ? `rotate(180 ${x + width / 2} ${y + height / 2})`
        : 'rotate(0)'

    return rotate
  }

  selection.select('path.Link-path').attr('d', addEdge)
  selection.select('path.Link-hover').attr('d', addEdge)
  selection
    .select('text.Link-label')
    .attr('transform', updateEdgeLabel.bind(selection))
}
