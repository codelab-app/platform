import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { BuilderTabsProps } from '@codelab/frontend/domain/builder'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
} from '@codelab/frontend/domain/builder'
import { PageDetailHeader } from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useRemainingPages,
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import { Spinner } from '@codelab/frontend/view/components'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useCallback, useMemo } from 'react'

const PageBuilder: CodelabPage<BuilderTabsProps> = observer(
  ({ error, isLoading, page, renderer }) => {
    return (
      <>
        <Head>
          <title>{page?.name} | Builder | Codelab</title>
        </Head>

        <BuilderTabs
          error={error}
          isLoading={isLoading}
          page={page}
          renderer={renderer}
        />
      </>
    )
  },
)

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

PageBuilder.Layout = observer(({ children }) => {
  const { builderRenderService } = useStore()

  const [{ error, status }, loadCurrentPage] = useRenderedPage({
    rendererType: RendererType.PageBuilder,
    renderService: builderRenderService,
  })

  const [, lazilyLoadRemainingPages] = useRemainingPages()

  useMountEffect(async () => {
    await loadCurrentPage.execute()
    await lazilyLoadRemainingPages.execute()
  })

  const isLoading = status !== 'success'
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const renderer = builderRenderService.renderers.get(pageId)
  const page = renderer?.elementTree.current
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  const ConfigPaneComponent = useCallback(
    () => (
      <Spinner isLoading={isLoading}>
        <ConfigPane renderService={renderer} />
      </Spinner>
    ),
    [isLoading, renderer],
  )

  const ExplorerPaneComponent = useCallback(
    () => (
      <Spinner isLoading={isLoading}>
        <BuilderExplorerPane pageId={pageId} />
      </Spinner>
    ),
    [isLoading, pageId],
  )

  return (
    <BuilderContext>
      <DashboardTemplate
        ConfigPane={ConfigPaneComponent}
        ExplorerPane={ExplorerPaneComponent}
        Header={PageDetailHeader}
        contentStyles={contentStyles}
        headerHeight={48}
        sidebarNavigation={sidebarNavigation({ appId, pageId })}
      >
        {children({ error, isLoading, page, renderer })}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
