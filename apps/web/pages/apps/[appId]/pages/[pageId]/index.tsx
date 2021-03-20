import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { InferGetServerSidePropsType } from 'next'
import React from 'react'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { usePage } from '../../../../../src/useCases/pages/getPage/useGetPageData'

const PageDetail = ({
  pageId,
  appId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { layoutGraph, page } = usePage({ pageId })

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
export const getServerSideProps = withPageAuthRequired()

export default PageDetail
