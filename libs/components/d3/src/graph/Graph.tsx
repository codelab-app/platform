import * as d3 from 'd3'
import { cloneDeep } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { IDMatcher } from './Graph-filters'
import { defineMarkers, ticked } from './Graph-updatePattern'
import { D3GraphProps } from './Graph.i'
import { enterLinks, updateLinks } from './links/Graph-links'
import { enterNodes, updateNodes } from './nodes/Graph-nodes'
import { g, linkAttribute } from './variables/Graph-variables'

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

export const D3Graph: React.FC<D3GraphProps> = (props) => {
  const [width, height] = [600, 600]
  const { nodes: nodesProps, links: linksProps } = props
  const d3Hooks = useD3Hooks()
  const d3Container = useRef<SVGSVGElement>(null)
  const ref: any = useRef()
  const simulation = d3.forceSimulation<any>()
  const refCurrent = JSON.stringify([nodesProps, linksProps])

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
      .selectAll('g.Node-group')
      .data(nodes, IDMatcher)
      .join(
        (enter: any) => enter.append('g').call(enterNodes, d3Hooks),
        (update: any) => update.call(updateNodes),
        (exit: any) => exit.remove(),
      )

    const d3Links = svg
      .select('g.links')
      .selectAll('g.Link-group')
      .data(links, IDMatcher)
      .join(
        (enter: any) =>
          enter.insert('g', 'g.Node-group').call(enterLinks, d3Hooks),
        (update: any) => update.call(updateLinks),
        (exit: any) => exit.remove(),
      )

    const d3ArrowDefs = svg
      .selectAll('marker.arrow')
      .data(links, IDMatcher)
      .join(
        (enter: any) => enter.append('svg:marker').call(defineMarkers),
        (update: any) => update.call(defineMarkers),
        (exit: any) => exit.remove(),
      )

    simulation
      .alpha(0.5)
      .nodes(nodes as any)
      .on('tick', ticked.bind({ d3Nodes, d3Links } as any))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('collision', d3.forceCollide(50))
      .force(
        'link',
        d3
          .forceLink<any, any>(links as any)
          .distance(linkAttribute('distance') as any)
          .id((d: any, i: number) => d.id),
      )
      .force('x', d3.forceX(g.width / 2))
      .force('y', d3.forceY(g.height / 2))
      .restart()
  }, [nodesProps, linksProps, d3Hooks, refCurrent, simulation])

  useEffect(() => {
    const svg = d3.select(d3Container.current) as any
    // Draw Temporary dotted link for dragging/drop indicating

    svg
      .append('svg:marker')
      .attr('id', 'arrow_temp_link')
      .attr('viewBox', '0 0 12 16')
      .attr('refX', 6)
      .attr('refY', 8)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M2,2 L14,8 L2,14 L8,8 L2,2')
      .attr('fill', 'gray')
    svg
      .select('g.nodes')
      .insert('path', 'g.Node-group')
      .attr('class', 'temp-link')
      .attr('stroke', '#ccc')
      .style('stroke-dasharray', '3, 3')
      .attr('stroke-width', 2)
      .attr('marker-mid', 'url(#arrow_temp_link)')
      .attr('fill', 'none')
  }, [])

  return (
    <svg
      style={{ border: '1px solid black' }}
      width={width}
      height={height}
      ref={d3Container}
    >
      <g className="nodes" />
      <g className="links" />
    </svg>
  )
}
