import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { Renderer, useTypesByIdQuery } from '@codelab/frontend/modules/builder'
import {
  PageDetailHeader,
  PageProvider,
  useAppElementTree,
  usePage,
} from '@codelab/frontend/modules/page'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import { useStore } from 'libs/frontend/model/infra/mobx/src/mst'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const currentPageId = useCurrentPageId()
  const { page } = usePage(currentPageId, store.pageService)
  const { typesById } = useTypesByIdQuery(store.typeService)
  const { appElementTree } = useAppElementTree(store.pageService)

  if (!page || !appElementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>

      <Renderer tree={appElementTree} typesById={typesById} />
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRequired()

PageRenderer.Layout = observer((page) => {
  const store = useStore()

  return (
    <PageProvider pages={store.pageService}>
      <DashboardTemplate
        Header={() => <PageDetailHeader pages={store.pageService} />}
        headerHeight={38}
      >
        {page.children}
      </DashboardTemplate>
    </PageProvider>
  )
})
