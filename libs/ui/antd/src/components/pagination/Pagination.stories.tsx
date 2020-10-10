import React from 'react'
import { paginationData } from './Pagination.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Pagination',
}

export const Default = () => {
  const Pagination = Renderer.components(paginationData)

  return <Pagination />
}
