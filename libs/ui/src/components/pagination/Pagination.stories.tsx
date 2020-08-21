import React from 'react'
import { paginationData } from './Pagination.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Pagination',
}

export const Default = () => {
  const Pagination = TreeDom.render(paginationData)

  return <Pagination />
}
