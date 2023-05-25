import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ComponentsExplorerPane,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend/domain/builder'
import {
  ExplorerPanePage,
  PageDetailHeader,
} from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useRemainingPages,
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presentation/container'
import {
  DashboardTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const { builderRenderService } = useStore()

  const [{ status: remainingPagesStatus }, lazilyLoadRemainingPages] =
    useRemainingPages()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const [{ error, result, status: renderedPageStatus }, loadCurrentPage] =
    useRenderedPage({
      rendererType: RendererType.PageBuilder,
    })

  useMountEffect(() => {
    void lazilyLoadRemainingPages.execute()
  })

  useEffect(() => {
    void loadCurrentPage.execute()
    builderRenderService.loadExternalComponents()
  }, [pageId])

  const isLoading =
    renderedPageStatus !== 'success' || remainingPagesStatus !== 'success'

  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <DashboardTemplate
      ConfigPane={() => (
        <SkeletonWrapper isLoading={isLoading}>
          <ConfigPaneInspectorTabContainer />
        </SkeletonWrapper>
      )}
      ExplorerPane={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: () => <ComponentsExplorerPane isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.Explorer,
            render: () => <BuilderExplorerPane isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.PageList,
            render: () => <ExplorerPanePage appId={appId} />,
          },
        ],
      }}
      Header={PageDetailHeader}
      contentStyles={contentStyles}
      headerHeight={48}
    >
      <Head>
        <title>{result?.page.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs error={error} isLoading={isLoading} />
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

PageBuilder.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
