import React from 'react'
import { tableData } from './Table.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Table',
  parameters: {
    data: {
      Default: tableData,
    },
  },
}

export const Default = () => {
  const Table = Renderer.components(tableData)

  return <Table />
}
