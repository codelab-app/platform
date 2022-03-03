import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { Renderer, useTypesByIdQuery } from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageDetailHeader,
  PageProvider,
  usePage,
} from '@codelab/frontend/modules/page'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const currentPageId = useCurrentPageId()
  const { page } = usePage(currentPageId, store.pages)
  const { elementTree } = useElementGraphContext()
  const { typesById } = useTypesByIdQuery()

  if (!page || !elementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>

      <Renderer tree={elementTree} typesById={typesById} />
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRequired()

PageRenderer.Layout = observer((page) => {
  const store = useStore()

  return (
    <PageProvider pages={store.pages}>
      <DashboardTemplate
        Header={() => <PageDetailHeader pages={store.pages} />}
        headerHeight={38}
      >
        {page.children}
      </DashboardTemplate>
    </PageProvider>
  )
})
