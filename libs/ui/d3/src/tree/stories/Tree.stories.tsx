import React from 'react'
import { D3Tree } from '../Tree'
import { d3TreeData } from './Tree.data'

export default {
  component: D3Tree,
  title: 'D3Tree',
}

export const basic = () => {
  return <D3Tree data={d3TreeData} />
}
