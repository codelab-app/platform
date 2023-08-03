import type { IPageProps } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import { type CodelabPage, PageType } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import {
  useCurrentPage,
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presentation/container'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import {
  builderRouteChangeHandler,
  extractErrorMessage,
  withPageAuthRedirect,
} from '@codelab/frontend/shared/utils'
import { useUnmountEffect, useUpdateEffect } from '@react-hookz/web'
import { Alert, Spin } from 'antd'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PageRenderer: CodelabPage<IPageProps> = observer(() => {
  const router = useRouter()
  const { pageService } = useStore()

  const [{ error, result, status }, actions] = useRenderedPage({
    rendererType: RendererType.Preview,
  })

  const { pageName } = useCurrentPage()

  const routeChangeHandler = React.useMemo(
    () => async (url: string) => {
      if (isNil(result)) {
        return
      }

      const pages = pageService.pagesByApp(result.app.id)
      await builderRouteChangeHandler(
        router,
        result.app,
        pages,
        url,
        PageType.PageDetail,
      )
    },
    [result],
  )

  useUpdateEffect(() => {
    if (!isNil(result)) {
      router.events.on('routeChangeStart', routeChangeHandler)
    }
  }, [result])

  useUnmountEffect(() => {
    router.events.off('routeChangeStart', routeChangeHandler)
  })

  useEffect(() => {
    router.events.off('routeChangeStart', routeChangeHandler)
    void actions.execute()
  }, [pageName])

  return (
    <>
      <Head>
        <title>{result?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {status === 'not-executed' && <Spin />}
      {result?.elementTree && <Renderer renderer={result.renderer} />}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRedirect()

PageRenderer.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader />
      ))}
      headerHeight={48}
    >
      {children()}
    </DashboardTemplate>
  )
})

PageRenderer.displayName = 'PageRenderer'
