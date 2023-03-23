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
import React, { useMemo } from 'react'

const PageBuilder: CodelabPage<BuilderTabsProps> = observer(
  ({ app, error, isLoading, page, renderer }) => {
    return (
      <>
        <Head>
          <title>{page?.name} | Builder | Codelab</title>
        </Head>

        <BuilderTabs
          app={app}
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

  const [{ error, result, status }, actions] = useRenderedPage({
    rendererType: RendererType.PageBuilder,
    renderService: builderRenderService,
  })

  useMountEffect(actions.execute)

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  const ConfigPaneComponent = () => (
    <Spinner isLoading={status !== 'success'}>
      <ConfigPane renderService={pageBuilderRenderer} />
    </Spinner>
  )

  const ExplorerPaneComponent = () => (
    <Spinner isLoading={status !== 'success'}>
      <BuilderExplorerPane
        appStore={pageBuilderRenderer?.appStore.current}
        pageId={pageId}
      />
    </Spinner>
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
        {children({
          app: result?.app,
          error,
          isLoading: status !== 'success',
          page: result?.page,
          renderer: result?.renderer,
        })}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
