import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useAppDevelopment } from '@codelab/frontend/application/app'
import {
  BuilderContext,
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend/application/builder'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend/application/page'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import { usePageQuery } from '@codelab/frontend/presentation/container'
import {
  DashboardTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const router = useRouter()
  const { appService, pageService } = useStore()
  const { pageName } = usePageQuery()

  const [{ error, result, status }, loadDevelopmentPage] = useAppDevelopment({
    rendererType: RendererType.PageBuilder,
  })

  // const routeChangeHandler = React.useMemo(
  //   () => async (url: string) => {
  //     if (isBoolean(result) && !result) {
  //       return
  //     }

  //     const pages = pageService.pagesByApp(result.app.id)
  //     await builderRouteChangeHandler(
  //       router,
  //       result.app,
  //       pages,
  //       url,
  //       PageType.PageBuilder,
  //     )
  //   },
  //   [result],
  // )

  // useUpdateEffect(() => {
  //   if (!isNil(result)) {
  //     router.events.on('routeChangeStart', routeChangeHandler)
  //   }
  // }, [result])

  /**
   * Only enable `routeChangeStart` after data is loaded & before unmount
   */
  useEffect(() => {
    // router.events.off('routeChangeStart', routeChangeHandler)
    void loadDevelopmentPage.execute()

    // Unmount
    return () => {
      // router.events.off('routeChangeStart', routeChangeHandler)
    }
  }, [pageName])

  const isLoading = status === 'loading'
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <DashboardTemplate
      ConfigPane={() => (
        <SkeletonWrapper isLoading={isLoading}>
          <ConfigPaneInspectorTabContainer />
        </SkeletonWrapper>
      )}
      Header={PageDetailHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: () => <ComponentsPrimarySidebar isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.Explorer,
            render: () => <BuilderPrimarySidebar isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.PageList,
            render: () => <PagesPrimarySidebar />,
          },
        ],
      }}
      contentStyles={contentStyles}
      headerHeight={48}
    >
      <Head>
        <title>{pageName} | Builder | Codelab</title>
      </Head>

      <BuilderTabs error={error} isLoading={isLoading} />
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

PageBuilder.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
