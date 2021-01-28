import { useRouter, withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
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

  return (
    <>
      <h1>{data?.getPage.title}</h1>
    </>
  )
}

export default R.compose(withRouter, withRouterLoader('pageId'))(PageDetail)
