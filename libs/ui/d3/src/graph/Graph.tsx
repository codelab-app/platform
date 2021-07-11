import * as d3 from 'd3'
import { cloneDeep } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { D3GraphProps, D3Link, D3Node } from './Graph.i'
import { IDMatcher } from './Graph-filters'
import { defineMarkers, ticked } from './Graph-updatePattern'
import { LinkHandlers } from './links/Graph-links'
import { enterLinks } from './links/Graph-links--enter'
import { updateLinks } from './links/Graph-links--update'
import { NodeHandlers } from './nodes/Graph-nodes'
import { enterNodes } from './nodes/Graph-nodes--enter'
import { updateNodes } from './nodes/Graph-nodes--update'

export const useD3Hooks = () => {
  return {
    setNewEdge: (args: any) => {
      console.log('setNewEdge')
    },
    setSelectedEdge: (args: any) => {
      console.log('setSelectedEdge')
    },
    setSelectedVertex: (args: any) => {
      console.log('setSelectedVertex')
    },
  }
}

export const D3Graph = ({
  width = 600,
  height = 600,
  ...props
}: D3GraphProps) => {
  const { nodes: nodesProps, links: linksProps } = props
  const d3Container = useRef<SVGSVGElement>(null)
  const ref: any = useRef()
  const simulation = d3.forceSimulation<D3Node, D3Link>()
  const refCurrent = JSON.stringify([nodesProps, linksProps])
  const nodeCtx: NodeHandlers = { onClick: props.onNodeClick }
  const linkCtx: LinkHandlers = { onClick: props.onLinkClick }

  useEffect(() => {
    if (refCurrent === ref.current) {
      return
    }

    ref.current = refCurrent

    const nodes = cloneDeep(nodesProps)
    const links = cloneDeep(linksProps)
    const svg = d3.select<SVGSVGElement | null, any>(d3Container.current)

    const d3Nodes = svg
      .select('g.nodes')
      .selectAll<SVGGElement, D3Node>('g')
      .data(nodes, IDMatcher)
      .join(
        (enter) => enter.append('g').call(enterNodes, nodeCtx),
        (update) => update.call(updateNodes),
        (exit) => exit.remove(),
      )

    const d3Links = svg
      .select('g.links')
      .selectAll<SVGGElement, any>('g')
      .data(links, IDMatcher)
      .join(
        (enter) => enter.insert('g', 'g').call(enterLinks, linkCtx),
        (update) => update.call(updateLinks),
        (exit) => exit.remove(),
      )

    // Link directional arrow
    const d3ArrowDefs = svg
      .selectAll<SVGGElement, any>('marker.arrow')
      .data(links, IDMatcher)
      .join(
        (enter) => enter.append('svg:marker').call(defineMarkers),
        (update) => update.call(defineMarkers),
        (exit) => exit.remove(),
      )

    simulation
      .alpha(0.5)
      .nodes(nodes)
      .on('tick', ticked.bind({ d3Nodes, d3Links }))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('collision', d3.forceCollide(50))
      .force(
        'link',
        d3
          .forceLink<D3Node, D3Link>(links)
          .distance(50)
          .id((d) => d.id),
      )
      .force('x', d3.forceX(width / 2))
      .force('y', d3.forceY(height / 2))
      .restart()
  }, [nodesProps, linksProps, refCurrent, simulation])

  useEffect(() => {
    const svg = d3.select(d3Container.current) as any
    // Draw Temporary dotted link for dragging/drop indicating

    // svg
    //   .append('svg:marker')
    //   .attr('id', 'arrow_temp_link')
    //   .attr('viewBox', '0 0 12 16')
    //   .attr('refX', 6)
    //   .attr('refY', 8)
    //   .attr('markerWidth', 10)
    //   .attr('markerHeight', 10)
    //   .attr('orient', 'auto')
    //   .append('svg:path')
    //   .attr('d', 'M2,2 L14,8 L2,14 L8,8 L2,2')
    //   .attr('fill', 'gray')
    // svg
    //   .select('g.nodes')
    //   .insert('path', 'g.Node-group')
    //   .attr('class', 'temp-link')
    //   .attr('stroke', '#ccc')
    //   .style('stroke-dasharray', '3, 3')
    //   .attr('stroke-width', 2)
    //   .attr('marker-mid', 'url(#arrow_temp_link)')
    //   .attr('fill', 'none')
  }, [])

  return (
    <svg
      style={{ border: '1px solid black' }}
      width={width ?? '100%'}
      height={height}
      ref={d3Container}
    >
      <g className="nodes" />
      <g className="links" />
    </svg>
  )
}
