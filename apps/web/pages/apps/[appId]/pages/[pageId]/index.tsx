import { InferGetServerSidePropsType } from 'next'
import React from 'react'
import { withAuthServerSideProps } from '../../../../../../../libs/frontend/src/infrastructure/auth/withAuthServerSideProps'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { usePage } from '../../../../../src/useCases/pages/getPage/useGetPageData'
import { Page, PropsWithIds } from '@codelab/frontend'
import { LayoutPane, useSetLayoutMutation } from '@codelab/generated'

const PageDetail = ({
  pageId,
  appId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { layoutGraph, page } = usePage({ pageId })
  const [setLayout] = useSetLayoutMutation()

  if (!layoutGraph || !page) {
    return null
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <div
        role="presentation"
        style={{ position: 'absolute', inset: 0 }}
        onClick={() =>
          setLayout({
            variables: {
              input: {
                pane: LayoutPane.None,
              },
            },
          })
        }
      />
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
