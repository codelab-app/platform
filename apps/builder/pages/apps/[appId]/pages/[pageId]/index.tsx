import { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import { Renderer } from '@codelab/frontend/modules/renderer'
import { createMobxState } from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

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

  const { loading, value, error } = useAsync(async () => {
    /**
     * load all apps to provide them to mobxState
     */
    const apps = await appService.getAll()
    const app = appService.app(appId)

    if (!app) {
      throw new Error('Missing app')
    }

    /**
     * load app store
     */
    const appStore = await storeService.getOne(app.store.id)

    if (!appStore) {
      throw new Error('App store not found')
    }

    /**
     * load all pages to provide them to mobxState
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
    const components = await componentService.getAll({
      owner: { auth0Id: userService.auth0Id },
    })

    const componentsWithElementTree = await componentService.loadComponentTrees(
      components,
    )

    /**
     *
     * load all types
     *
     */
    const types = await typeService.getAll()
    /**
     *
     * page Element tree
     *
     */
    const pageElementTree = await page.initTree(page.rootElement.id)

    const renderer = await appRenderService.addRenderer(
      pageId,
      pageElementTree,
      null,
      appStore,
      createMobxState(appStore, apps, pages, router),
      false,
    )

    return {
      page,
      pageElementTree,
      providerTree: null,
      appStore,
      renderer,
      components: componentsWithElementTree,
      types,
    }
  }, [])

  return (
    <>
      <Head>
        <title>{value?.page?.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {loading && <Spin />}
      {!loading && value?.pageElementTree && value.renderer && (
        <Renderer renderRoot={value.renderer.renderRoot.bind(value.renderer)} />
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
