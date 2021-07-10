import * as d3 from 'd3'
import { DomHandler, DomHandlerHOC } from './Graph-domHandlers.i'
import { nonActiveLinks, nonActiveNodes } from './Graph-filters'
import { g, linkAttribute, nodeAttribute } from './variables/Graph-variables'

export const drawingTempLink = (source: any, target: any) => {
  const [x1, y1, x2, y2] = [source.x, source.y, target.x, target.y]
  const dx = x2 - x1
  const dy = y2 - y1
  const dPath = `M${x1},${y1} L${x1 + dx / 2},${y1 + dy / 2}  L${x2},${y2}`

  d3.select('path.temp-link').attr('d', dPath)

  return dPath
}

export const clearTempLink = () => {
  d3.selectAll('path.temp-link').attr('d', '')
}

const deactivateNodes = (nodes: any) =>
  d3
    .selectAll(nodes)
    .filter(nonActiveNodes)
    .attr('fill', nodeAttribute('color'))

const deactivateAllNodes = () =>
  d3.selectAll('g.Node-group').attr('fill', nodeAttribute('color'))

const deactivateLinks = (links: any) => {
  d3.selectAll(links)
    .filter(nonActiveLinks)
    .select('path')
    .attr('stroke', linkAttribute('color'))

  d3.selectAll(links)
    .filter(nonActiveLinks)
    .select('text')
    .attr('fill', linkAttribute('color'))

  d3.selectAll('.arrow')
    .filter(nonActiveLinks)
    .select('path')
    .attr('fill', linkAttribute('color'))
}

const deactivateAllLinks = () => {
  d3.selectAll('g.Link-group')
    .select('path')
    .attr('stroke', linkAttribute('color'))

  d3.selectAll('text.Link-label')
    .select('text')
    .attr('fill', linkAttribute('color'))

  d3.selectAll('.arrow').select('path').attr('fill', linkAttribute('color'))
}

/**
 * Node handlers
 */
export const handleClickNode = (node, i, nodes) => {
  return Promise.all([
    /**
     * if label === '+', then trigger create event
     */
    // setSelectedVertex(modelID),
  ]).then(() => {
    // Fill active node
    g.activeNode = node
    d3.select(nodes[i]).attr('fill', g.activeNodeColor)
    deactivateNodes(nodes)
    deactivateAllLinks()
  })
}

export const handleMouseoverNode: DomHandler<any> = (node, i, nodes) => {
  d3.select(nodes[i]).attr('fill', g.activeNodeColor)
}

export const handleMouseoutNode: DomHandler<any> = (node, i, nodes) => {
  deactivateNodes(nodes)
}

// Drag & Drop Handlers
export const handleDragStart: DomHandler<any> = (node, i, nodes) => {
  g.activeNode = node
  clearTempLink()
}

// export const handleDragNode: DomHandler<any> = (node, i, nodes) => {
//   const {
//     sourceEvent: {
//       srcElement: { __data__: target },
//     },
//     x,
//     y,
//   } = d3.event

//   const targetIdx =
//     target && target.id !== g.activeNode.id
//       ? // eslint-disable-next-line no-underscore-dangle
//         Array.from(nodes).findIndex((d) => d.__data__.id === target.id)
//       : -1

//   if (targetIdx > -1) {
//     const [targetNode] = d3.select(nodes[targetIdx]).data()

//     drawingTempLink(node, targetNode)
//   } else {
//     drawingTempLink(node, { x, y })
//   }
// }

// export const handleDragEndNode: DomHandlerHOC<any, any> = ({
//   setNewEdge,
//   notifyMediator,
// }) => (node, i, nodes) => {
//   const {
//     sourceEvent: {
//       srcElement: { __data__: target },
//     },
//   } = d3.event
//   const targetIdx =
//     target && target.id !== g.activeNode.id
//       ? // eslint-disable-next-line no-underscore-dangle
//         Array.from(nodes).findIndex((d) => d.__data__.id === target.id)
//       : -1

//   if (targetIdx > -1) {
//     const [targetNode] = d3.select(nodes[targetIdx]).data()

//     drawingTempLink(node, targetNode)
//     setNewEdge(g.activeNode.id, target.id)
//   } else {
//     clearTempLink()
//   }
// }

/**
 * Link handlers
 */

// export const handleMouse
export const handleMouseoverLink: DomHandler<any> = (link, i, links) => {
  d3.select(links[i]).select('path').attr('stroke', g.activeLinkColor)
  d3.select(`#arrow_${link.id}`).select('path').attr('fill', g.activeLinkColor)
}

export const handleMouseoutLink: DomHandler<any> = (link, i, links) => {
  deactivateLinks(links)
}

export const handleClickLink: DomHandlerHOC<any, any> =
  ({ notifyMediator, setSelectedEdge }) =>
  (link, i, links) =>
    Promise.all([setSelectedEdge(link.id)]).then(() => {
      g.activeLink = link
      d3.select(links[i]).select('path').attr('stroke', g.activeLinkColor)
      d3.select(`#arrow_${link.id}`)
        .select('path')
        .attr('fill', g.activeLinkColor)
      deactivateLinks(links)
      deactivateAllNodes()
    })
