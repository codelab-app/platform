import { CodelabPage } from '@codelab/frontend/abstract/types'
import { Page, PageDetailHeader } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
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
import React from 'react'
import { useAsync } from 'react-use'

const PageRenderer: CodelabPage = observer(() => {
  const {
    userService,
    pageService,
    appService,
    typeService,
    appRenderService,
    componentService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const { loading, value, error } = useAsync(async () => {
    const {
      apps,
      components,
      // Can't change shape in GraphQL so we have to use this structure
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    } = await pageService.getRenderedPage(appId, pageId)

    if (!apps[0]) {
      return
    }

    const { pageElementTree, page, store } = appService.load({
      app: apps[0],
      pageId,
    })

    typeService.load({
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    })

    components.map((component) =>
      componentService.loadRenderedComponentTree(component),
    )

    const renderer = appRenderService.addRenderer({
      id: pageId,
      pageTree: pageElementTree,
      appTree: null,
      appStore: store,
      isBuilder: false,
    })

    return {
      page,
      pageElementTree,
      renderer,
    }
  }, [])

  return (
    <>
      <Head>
        <title>{value?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {loading && <Spin />}
      {!loading && value?.pageElementTree && (
        <Renderer renderRoot={value.renderer.renderRoot.bind(value.renderer)} />
      )}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = auth0Instance.withPageAuthRequired({
  getServerSideProps: Page.getServerSideProps,
})

PageRenderer.Layout = observer((page) => {
  const { userService, appService, pageService } = useStore()

  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader pageService={pageService} />
      ))}
      headerHeight={48}
    >
      {page.children}
    </DashboardTemplate>
  )
})

PageRenderer.displayName = 'PageRenderer'
