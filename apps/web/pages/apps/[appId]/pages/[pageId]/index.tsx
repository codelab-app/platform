import { InferGetServerSidePropsType } from 'next'
import React from 'react'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { usePage } from '../../../../../src/useCases/pages/getPage/useGetPageData'
import { Page, PropsWithIds, withAuthServerSideProps } from '@codelab/frontend'

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
export const getServerSideProps = withAuthServerSideProps((context, user) => {
  if (!user) {
    return {
      redirect: {
        destination: Page.HOME.url,
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...(context.query as PropsWithIds<'appId' | 'pageId'>),
    },
  }
})

export default PageDetail
