import { useRouter, withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { GetPageLayout } from '../../../../../src/pages/getPage/GetPageLayout'
import { withRouterLoader } from '@codelab/frontend'
import { useGetPageQuery } from '@codelab/generated'

const PageDetail = () => {
  const { query } = useRouter()
  const pageId = `${query.pageId}`

  const { data } = useGetPageQuery({
    variables: {
      input: {
        pageId,
      },
    },
  })

  const layoutGraph = data?.getPage.graphs.filter(
    (graph) => graph.type === 'Layout',
  )

  console.log(layoutGraph)

  return (
    <>
      <h1>{data?.getPage.title}</h1>
      <GetPageLayout graph={layoutGraph?.[0]} />
    </>
  )
}

export default R.compose(withRouter, withRouterLoader('pageId'))(PageDetail)
