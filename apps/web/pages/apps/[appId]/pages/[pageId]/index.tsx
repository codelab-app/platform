import React from 'react'
import { GetPageLayout } from '../../../../../src/pages/getPage/GetPageLayout'
import { useGetPageData } from '../../../../../src/pages/getPage/useGetPageData'
import { withRouterGuard } from '@codelab/frontend'

interface PageDetailProps {
  pageId: string
}

const PageDetail = ({ pageId }: PageDetailProps) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  if (!layoutGraph || !page) return null

  return (
    <>
      <h1>{page.title}</h1>
      <GetPageLayout graph={layoutGraph} pageId={pageId} />
    </>
  )
}

export default withRouterGuard(['pageId'])(PageDetail)
