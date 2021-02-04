import React from 'react'
import { PageContainerCreate } from '../../useCases/pages/Page-container--create'
import { PageContainerUpdateDelete } from '../../useCases/pages/Page-container--updateDelete'
import { usePage } from '../../useCases/pages/usePage'
import { PropsWithIds } from '@codelab/frontend'

type BuilderDetails = PropsWithIds<'appId'>

export const BuilderDetails = ({ appId }: BuilderDetails) => {
  const { pageId } = usePage()

  return (
    <>
      {pageId ? (
        <PageContainerUpdateDelete appId={appId} pageId={pageId} />
      ) : (
        <PageContainerCreate appId={appId} />
      )}
    </>
  )
}
