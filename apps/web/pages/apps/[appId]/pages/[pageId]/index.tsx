import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PropsWithIds } from '@codelab/frontend/shared'
import { GetPageLayout, useGetPageData } from '@codelab/modules/page'
import { InferGetServerSidePropsType } from 'next'
import React from 'react'

const PageDetail = ({
  pageId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  if (!layoutGraph || !page) {
    return null
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <h1>{page.title}</h1>
      <GetPageLayout graph={layoutGraph} pageId={pageId} />
    </div>
  )
}

// Redirect to home if not authenticated
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: (context) => {
    return {
      props: {
        ...(context.query as PropsWithIds<'appId'>),
      },
    }
  },
})

export default PageDetail
