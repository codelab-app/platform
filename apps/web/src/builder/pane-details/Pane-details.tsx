import React from 'react'
import { PageContainerCreate } from '../../useCases/pages/Page-container--create'
import { PageContainerUpdateDelete } from '../../useCases/pages/Page-container--updateDelete'
import { usePage } from '../../useCases/pages/usePage'

export const BuilderDetails = () => {
  const { detailPageId } = usePage()

  return (
    <>
      {detailPageId ? <PageContainerUpdateDelete /> : <PageContainerCreate />}
    </>
  )
}
