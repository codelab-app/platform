import './D3.scss'
import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import { D3TreeData, D3TreeLink, D3TreeProps } from './tree.interface'
import { D3TreeNode, updateNode } from './Tree-node'

// https://www.d3indepth.com/layouts/
export const D3Tree = ({
  width = 600,
  height = 600,
  ...props
}: D3TreeProps) => {
  const { data } = props
  const treeLayout = d3.tree<D3TreeData>().size([360, 120])
  const d3Container = useRef<SVGSVGElement>(null)
  const root = d3.hierarchy<D3TreeData>(data)
  const ref: any = useRef()
  const refCurrent = JSON.stringify(data)
  const layoutRoot = treeLayout(root)

  useEffect(() => {
    if (refCurrent === ref.current) {
      return
    }

    ref.current = refCurrent

    const svg = d3.select<SVGSVGElement | null, any>(d3Container.current)

    // Nodes
    svg
      .select('g.nodes')
      .selectAll<SVGGElement, D3TreeNode>('circle')
      .data(layoutRoot.descendants())
      .enter()
      // Add circle
      .append('g')
      .classed('node', true)
      .call(updateNode)

    // Links
    svg
      .select('g.links')
      .selectAll<SVGGElement, D3TreeLink>('line.link')
      .data(layoutRoot.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
  }, [data, d3Container, ref, refCurrent, root])

  return (
    <svg width={width} height={height} ref={d3Container}>
      <g transform="translate(5, 5)">
        <g className="nodes" />
        <g className="links" />
      </g>
    </svg>
  )
}
