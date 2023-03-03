import type { IPageProps } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { Page, PageDetailHeader } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import {
  useCurrentAppId,
  useCurrentPageId,
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const PageRenderer: CodelabPage<IPageProps> = observer(
  ({ getServerSidePropsData }) => {
    const { appRenderService } = useStore()
    const appId = useCurrentAppId()
    const pageId = useCurrentPageId()

    const { value, error, loading } = useRenderedPage({
      appId,
      pageId,
      rendererType: RendererType.Preview,
      renderService: appRenderService,
    })

    useEffect(() => {
      if (value?.appStore && getServerSidePropsData) {
        value.appStore.state.setMany(getServerSidePropsData)
      }
    }, [loading])

    return (
      <>
        <Head>
          <title>{value?.page.name}</title>
        </Head>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}
        {loading && <Spin />}
        {!loading && value?.pageTree && (
          <Renderer
            renderRoot={value.renderer.renderRoot.bind(value.renderer)}
          />
        )}
      </>
    )
  },
)

export default PageRenderer

export const getServerSideProps = auth0Instance.withPageAuthRequired({
  getServerSideProps: Page.getServerSideProps,
})

PageRenderer.Layout = observer((page) => {
  const { pageService } = useStore()

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
