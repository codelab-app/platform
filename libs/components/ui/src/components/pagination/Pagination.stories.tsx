import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { paginationData } from './Pagination.data'

export default {
  title: 'Pagination',
}

export const Default = () => {
  const Pagination = TreeDom.render(paginationData)

  return <Pagination />
}
