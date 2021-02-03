import React from 'react'
import { GetPageLayout } from '../../../../../src/pages/getPage/GetPageLayout'
import { useGetPageData } from '../../../../../src/pages/getPage/useGetPageData'
import { PropsWithIds, withRouterGuard } from '@codelab/frontend'

const PageDetail = ({ pageId }: PropsWithIds<'pageId'>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  if (!layoutGraph || !page) {
    return null
  }

  return (
    <>
      <h1>{page.title}</h1>
      <GetPageLayout graph={layoutGraph} pageId={pageId} />
    </>
  )
}

const _PageDetail = withRouterGuard(['pageId'])(PageDetail)

export default _PageDetail
