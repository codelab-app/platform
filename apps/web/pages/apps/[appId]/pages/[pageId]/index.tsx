import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import { Renderer } from '@codelab/frontend/modules/renderer'
import { createMobxState } from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const PageRenderer: CodelabPage<any> = observer(() => {
  const {
    pageService,
    appService,
    typeService,
    componentService,
    storeService,
    appRenderService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const router = useRouter()
  // Load the pages list for the top bar
  useStatefulExecutor(() => pageService.getAll(), { executeOnMount: true })

  const [, { isLoading, error, data, isDone }] = useStatefulExecutor(
    async () => {
      // load all apps to provide them to mobxState
      const apps = await appService.getAll()
      // load all pages to provide them to mobxState
      const pages = await pageService.getAll()
      const app = appService.app(appId)
      const page = pageService.page(pageId)

      if (!page) {
        throw new Error('Page not found')
      }

      const storeTree = app?.store?.id
        ? await storeService.getOne(app.store.id)
        : null

      // components are needed to build pageElementTree
      // therefore they must be loaded first
      await componentService.loadComponentTrees()

      /**
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [pageElementTree, providerTree, types] = await Promise.all([
        page.initTree(page.rootElement.id),
        app.initTree(app.rootElement.id),
        typeService.getAll(),
      ])

      // initialize renderer
      const renderer = await appRenderService.addRenderer(
        pageId,
        pageElementTree,
        null,
        createMobxState(storeTree, apps, pages, router),
      )

      return {
        page,
        pageElementTree,
        // providerTree,
        // storeTree,
        renderer,
      }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      {isDone && data?.pageElementTree && data.renderer ? (
        <Renderer renderRoot={data.renderer.renderRoot.bind(data.renderer)} />
      ) : null}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRequired({})

PageRenderer.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader pageService={store.pageService} />
      ))}
      headerHeight={38}
    >
      {page.children}
    </DashboardTemplate>
  )
})
