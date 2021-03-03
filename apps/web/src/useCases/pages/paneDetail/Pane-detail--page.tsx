import React from 'react'
import { PageContainerCreate } from '../Page-container--create'
import { PageContainerUpdateDelete } from '../Page-container--updateDelete'
import { usePage } from '../usePage'

export const PageDetailPane = () => {
  const { detailPageId } = usePage()

  return (
    <>
      {detailPageId ? <PageContainerUpdateDelete /> : <PageContainerCreate />}
    </>
  )
}
