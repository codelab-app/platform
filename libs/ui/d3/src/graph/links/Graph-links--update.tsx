import { D3Link, D3Node } from '../Graph.i'
import {
  LINK_HOVER_CLASS,
  LINK_LABEL_CLASS,
  LINK_PATH_CLASS,
  LinkSelection,
} from './Graph-links'

/**
 * After enter is called once, we call update per tick. If you see the force moving, that is because the DOM is updated here per tick.
 */
export const updateLinks = (selection: LinkSelection, links = []) => {
  const addEdge = (d: D3Link) => {
    // TODO
    // if (!has(d, 'target.id')) return ''
    const target = d.target as D3Node
    const source = d.source as D3Node
    // const divider = d?.biDirection ? 1 / 2 : 0
    const targetX = target?.x ?? 0
    const sourceX = source?.x ?? 0
    const targetY = target?.y ?? 0
    const sourceY = source?.y ?? 0
    const [dX, dY] = [targetX - sourceX, targetY - sourceY]

    const [x1, y1, x2, y2] = [
      sourceX + dX * 0,
      sourceY + dY * 0,
      // sourceX + dX * divider,
      // sourceY + dY * divider,
      targetX,
      targetY,
    ]

    const dx = x2 - x1
    const dy = y2 - y1
    // const dr = 50

    // if (d.target.id === d.source.id) {
    //   const xRotation = -45
    //   const largeArc = 0
    //   // Change sweep to change orientation of loop.
    //   const sweep = 1

    //   return `M${x1},${y1} A${dr},${dr} ${xRotation},${largeArc},${sweep} ${x2},${y2}`
    // }

    return `M${x1},${y1} L${x1 + dx / 2},${y1 + dy / 2}  L${x2},${y2}`
  }

  const updateEdgeLabel = (d: D3Link) => {
    // if (d.target.id) {
    //   return ''
    // }
    // const { x, y, width, height } = elements[i].getBBox()
    // const rotate =
    //   d.target.x < d.source.x
    //     ? `rotate(180 ${x + width / 2} ${y + height / 2})`
    //     : 'rotate(0)'
    // return rotate
    return null
  }

  selection.select(`path.${LINK_PATH_CLASS}`).attr('d', addEdge)
  selection.select(`path.${LINK_HOVER_CLASS}`).attr('d', addEdge)
  selection
    .select(`text.${LINK_LABEL_CLASS}`)
    .attr('transform', updateEdgeLabel.bind(selection))
}
