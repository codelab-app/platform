import React from 'react'
import { D3Graph } from './Graph'
import { d3GraphData } from './Graph.data'

export default {
  component: D3Graph,
  title: 'D3Graph',
}

export const BasicGraph = () => {
  return <D3Graph {...d3GraphData} />
}

// Swap out d3GraphData for your file
export const MySecondGraph = () => {
  return <D3Graph {...d3GraphData} />
}
