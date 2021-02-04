import React from 'react'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { useGetPageData } from '../../../../../src/useCases/pages/getPage/useGetPageData'
import { PropsWithIds, withRouterGuard } from '@codelab/frontend'
import { useBuilderLayout } from 'apps/web/src/builder/Builder-pane--state'

const PageDetail = ({ pageId }: PropsWithIds<'pageId'>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  const layout = useBuilderLayout()

  if (!layoutGraph || !page) {
    return null
  }

  return (
    <div id="Builder" onClick={() => layout.setPane('none')}>
      <h1>{page.title}</h1>
      <GetPageLayout graph={layoutGraph} pageId={pageId} />
    </div>
  )
}

const _PageDetail = withRouterGuard(['pageId'])(PageDetail)

export default _PageDetail
