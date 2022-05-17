import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { createMobxState, Renderer } from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
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
    elementService,
    builderService,
    providerElementTree,
    storeService,
    renderService,
    pageElementTree,
  } = useStore()

  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const router = useRouter()
  // Load the pages list for the top bar
  useStatefulExecutor(() => pageService.getAll(), { executeOnMount: true })

  const [, { isLoading, error, data }] = useStatefulExecutor(
    async () => {
      // load all apps to provide them to mobxState
      const apps = await appService.getAll()
      // load all pages to provide them to mobxState
      const pages = await pageService.getAll()
      const app = appService.app(currentAppId)
      const page = pageService.page(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      const storeTree = app?.store?.id
        ? await storeService.getOne(app.store.id)
        : null

      // Get element tree and provider tree
      const [elementTree, providerTree] = await Promise.all([
        pageElementTree.getTree(page.rootElement.id),
        providerElementTree.getTree(page.providerElement.id),
      ])

      // initialize renderer
      await renderService.init(
        pageElementTree,
        providerElementTree,
        createMobxState(storeTree, apps, pages, router),
      )

      return {
        page,
        elementTree,
        providerTree,
        storeTree,
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
      <Renderer
        isInitialized={builderService.builderRenderer.isInitialized}
        renderRoot={builderService.builderRenderer.renderRoot.bind(
          builderService.builderRenderer,
        )}
      />
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
