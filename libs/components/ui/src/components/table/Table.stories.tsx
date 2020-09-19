import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { tableData } from './Table.data'

export default {
  title: 'Table',
}

export const Default = () => {
  const Table = TreeDom.render(tableData)

  return <Table />
}
