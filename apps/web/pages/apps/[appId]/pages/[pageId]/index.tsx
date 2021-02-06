import React from 'react'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { useGetPageData } from '../../../../../src/useCases/pages/getPage/useGetPageData'
import { PropsWithIds, withRouterGuard } from '@codelab/frontend'
import { LayoutPane } from '@codelab/generated'
import { useLayout } from 'apps/web/src/builder/useLayout'

const PageDetail = ({ pageId }: PropsWithIds<'pageId'>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })
  const { setLayout } = useLayout()

  if (!layoutGraph || !page) {
    return null
  }

  return (
    <div
      id="Builder"
      onClick={() =>
        setLayout({
          variables: {
            input: {
              pane: LayoutPane.None,
            },
          },
        })
      }
    >
      <h1>{page.title}</h1>
      <GetPageLayout graph={layoutGraph} pageId={pageId} />
    </div>
  )
}

const _PageDetail = withRouterGuard(['pageId'])(PageDetail)

export default _PageDetail
