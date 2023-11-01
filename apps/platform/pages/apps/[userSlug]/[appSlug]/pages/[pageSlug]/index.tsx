import type { IPageProps } from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/application'
import { type CodelabPage } from '@codelab/frontend/abstract/types'
import { useAppDevelopment } from '@codelab/frontend/application/app'
import { PageDetailHeader } from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import { usePageQuery } from '@codelab/frontend/presentation/container'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import isBoolean from 'lodash/isBoolean'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PageRenderer: CodelabPage<IPageProps> = observer(() => {
  const router = useRouter()
  const { pageService } = useStore()

  const [{ error, result, status }, loadDevelopmentPage] = useAppDevelopment({
    rendererType: RendererType.Preview,
  })

  const { pageName } = usePageQuery()

  // const routeChangeHandler = React.useMemo(
  //   () => async (url: string) => {
  //     if (isNil(result)) {
  //       return
  //     }

  //     const pages = pageService.pagesByApp(result.app.id)
  //     await builderRouteChangeHandler(
  //       router,
  //       result.app,
  //       pages,
  //       url,
  //       PageType.PageDetail,
  //     )
  //   },
  //   [result],
  // )

  // useUpdateEffect(() => {
  //   if (!isNil(result)) {
  //     router.events.on('routeChangeStart', routeChangeHandler)
  //   }
  // }, [result])

  // useUnmountEffect(() => {
  //   router.events.off('routeChangeStart', routeChangeHandler)
  // })

  useEffect(() => {
    // router.events.off('routeChangeStart', routeChangeHandler)
    void loadDevelopmentPage.execute()
  }, [pageName])

  // boolean means router.push was called from the hook, so will redirect anyways
  if (isBoolean(result)) {
    return null
  }

  return (
    <>
      <Head>
        <title>{result?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {status === 'not-executed' && <Spin />}
      {result?.elementTree && <RootRenderer renderer={result.renderer} />}
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
