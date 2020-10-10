import React from 'react'
import { tableData } from './Table.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Table',
}

export const Default = () => {
  const Table = Renderer.components(tableData)

  return <Table />
}
