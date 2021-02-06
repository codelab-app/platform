import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { GetPageLayout } from '../../../../../src/useCases/pages/getPage/GetPageLayout'
import { usePage } from '../../../../../src/useCases/pages/getPage/useGetPageData'
import { PropsWithIds } from '@codelab/frontend'
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

export const getServerSideProps: GetServerSideProps<
  PropsWithIds<'appId' | 'pageId'>
> = async (context) => {
  return await {
    props: {
      ...(context.query as PropsWithIds<'appId' | 'pageId'>),
    },
  }
}

export default PageDetail
