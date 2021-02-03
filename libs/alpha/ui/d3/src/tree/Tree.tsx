import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import { updateNode } from './Tree-node'
// import './D3.scss'

export type D3TreeData = {
  label: string
  value?: string | number
  children?: Array<D3TreeData>
}

export interface D3TreeProps {
  data: D3TreeData
}

// https://www.d3indepth.com/layouts/
export const D3Tree: React.FC<D3TreeProps> = (props) => {
  const [width, height] = [400, 200]
  const { data } = props
  const treeLayout = d3.tree().size([width, height])
  const d3Container = useRef<SVGSVGElement>(null)
  const root = d3.hierarchy(data)
  const ref: any = useRef()
  const refCurrent = JSON.stringify(data)

  treeLayout(root)

  useEffect(() => {
    if (refCurrent === ref.current) {
      return
    }

    ref.current = refCurrent
    const svg = d3.select<SVGSVGElement | null, any>(d3Container.current)

    // Nodes
    svg
      .select('g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      // Add circle
      .append('g')
      .classed('node', true)
      .call(updateNode)

    // Links
    svg
      .select('g.links')
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
  }, [data, d3Container, ref, refCurrent, root])

  return (
    <svg width={width} height={height + 20} ref={d3Container}>
      <g transform="translate(5, 5)">
        <g className="nodes" />
        <g className="links" />
      </g>
    </svg>
  )
}
