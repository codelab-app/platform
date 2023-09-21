import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend/domain/builder'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend/domain/page'
import { withActiveSpan } from '@codelab/frontend/infra/adapter/otel'
import {
  useCurrentPage,
  useDevelopmentPage,
  usePageQuery,
  useStore,
} from '@codelab/frontend/presentation/container'
import {
  DashboardTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { builderRouteChangeHandler } from '@codelab/frontend/shared/utils'
import { withBoundContext } from '@codelab/shared/infra/otel'
import { context, trace } from '@opentelemetry/api'
import { setSpan } from '@opentelemetry/api/build/src/trace/context-utils'
import { useUnmountEffect, useUpdateEffect } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const router = useRouter()
  const { pageService } = useStore()
  const { pageName } = usePageQuery()

  const [{ error, result }, loadDevelopmentPage] = useDevelopmentPage({
    rendererType: RendererType.PageBuilder,
  })

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
        PageType.PageBuilder,
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
    void loadDevelopmentPage.execute()
  }, [pageName])

  const isLoading = isNil(result?.app)
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

export const getServerSideProps = withPageAuthRequired({})

PageBuilder.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
