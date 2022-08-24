import { auth0Instance } from '@codelab/backend'
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
    userService,
    appRenderService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const router = useRouter()

  const [, { isLoading, error, data, isDone }] = useStatefulExecutor(
    async () => {
      /**
       *
       * load all apps to provide them to mobxState
       */
      const apps = await appService.getAll()
      const app = appService.app(appId)
      /**
       *
       * load app store
       *
       */
      const appStore = await storeService.getOne(app.store.id)

      if (!appStore) {
        throw new Error('App store not found')
      }

      /**
       *
       * load all pages to provide them to mobxState
       *
       * */
      const pages = await pageService.getAll()
      const page = pageService.page(pageId)

      if (!page) {
        throw new Error('Page not found')
      }

      /**
       *
       * components are needed to build pageElementTree
       *
       */
      const components = await componentService.loadComponentTrees(
        userService.auth0Id,
      )

      /**
       *
       * load all types
       *
       */
      const types = await typeService.getAll()
      /**
       *
       * construct provider tree
       *
       */
      const providerTree = await app.initTree(app.rootElement.id)
      /**
       *
       * page Element tree
       *
       */
      const pageElementTree = await page.initTree(page.rootElement.id)

      const renderer = await appRenderService.addRenderer(
        pageId,
        pageElementTree,
        providerTree,
        appStore,
        createMobxState(appStore, apps, pages, router),
        false,
      )

      return {
        page,
        pageElementTree,
        providerTree,
        appStore,
        renderer,
        components,
        types,
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
      {isDone && data?.pageElementTree && data.renderer && (
        <Renderer renderRoot={data.renderer.renderRoot.bind(data.renderer)} />
      )}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

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

PageRenderer.displayName = 'PageRenderer'
