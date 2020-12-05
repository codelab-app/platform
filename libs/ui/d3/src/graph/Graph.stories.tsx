import React from 'react'
import { D3Graph } from './Graph'
import { d3GraphData } from './Graph.data'

export default {
  component: D3Graph,
  title: 'D3Graph',
}

export const BasicGraph = () => {
  return <D3Graph {...d3GraphData} />
  // return <D3Graph {...d3TestData} />
  // return <D3Graph {...d3TestDataMoved} />
}
