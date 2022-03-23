import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  PageDetailHeader,
  PageProvider,
  useAppElementTree,
  usePage,
} from '@codelab/frontend/modules/page'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const currentPageId = useCurrentPageId()
  const { page } = usePage(currentPageId, store.pageService)
  const { appElementTree } = useAppElementTree(store.pageService)

  if (!page || !appElementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page?.name}</title>
      </Head>

      {/* <Renderer tree={appElementTree} typesById={typesById} />*/}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const store = initializeStore()
    const pageId = context.query.pageId as string
    // Load the page we're rendering
    const page = await store.pageService.getOne(pageId)

    if (!page) {
      return { notFound: true }
    }

    // Get element tree and provider tree
    // we could optimize this to be in one call with the page
    await Promise.all([
      store.elementService.getTree(page.rootElementId),
      store.providerElementService.getTree(page.providerElementId),
    ])

    // initialize renderer
    await store.renderService.init(
      store.elementService.elementTree,
      store.providerElementService.elementTree,
      null,
    )

    return { props: { snapshot: getSnapshot(store) } }
  },
})

PageRenderer.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      Header={() => <PageDetailHeader pages={store.pageService} />}
      headerHeight={38}
    >
      {page.children}
    </DashboardTemplate>
  )
})
