import type { IPageProps } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend/domain/page'
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
import { useMountEffect } from '@react-hookz/web'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const PageRenderer: CodelabPage<IPageProps> = observer(() => {
  const { appRenderService } = useStore()
  const pageId = useCurrentPageId()

  const [{ error, result, status }, actions] = useRenderedPage({
    rendererType: RendererType.Preview,
    renderService: appRenderService,
  })

  // useEffect(() => {
  //   if (value?.appStore && getServerSidePropsData) {
  //     value.appStore.state.setMany(getServerSidePropsData)
  //   }
  // }, [loading])

  useMountEffect(actions.execute)

  return (
    <>
      <Head>
        <title>{result?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {status === 'loading' && <Spin />}
      {status === 'success' && result?.elementTree && (
        <Renderer
          renderRoot={result.renderer.renderRoot.bind(result.renderer)}
        />
      )}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = auth0Instance.withPageAuthRequired()

PageRenderer.Layout = observer(({ children }) => {
  const { pageService } = useStore()

  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader pageService={pageService} />
      ))}
      headerHeight={48}
    >
      {children()}
    </DashboardTemplate>
  )
})

PageRenderer.displayName = 'PageRenderer'
