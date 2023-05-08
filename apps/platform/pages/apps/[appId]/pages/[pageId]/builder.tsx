import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
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
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useMemo } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const { appService } = useStore()
  const [, lazilyLoadRemainingPages] = useRemainingPages()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const [{ error, result, status }, loadCurrentPage] = useRenderedPage({
    rendererType: RendererType.PageBuilder,
  })

  const [{ result: apps, status: appsLoadingStatus }, actions] = useAsync(() =>
    appService.loadAppsWithNestedPreviews({ id: appId }),
  )

  useMountEffect(() => {
    void loadCurrentPage.execute().finally(actions.execute)
    void lazilyLoadRemainingPages.execute()
  })

  const isLoading = status !== 'success'
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <DashboardTemplate
      ConfigPane={() => <ConfigPane isLoading={isLoading} />}
      ExplorerPane={{
        default: PageType.PageBuilder,
        items: [
          {
            key: PageType.PageBuilder,
            render: () => <BuilderExplorerPane isLoading={isLoading} />,
          },
          {
            key: PageType.PageList,
            render: () => (
              <ExplorerPanePage
                app={apps?.[0]}
                loading={
                  appsLoadingStatus === 'loading' ||
                  appsLoadingStatus === 'not-executed'
                }
              />
            ),
          },
        ],
      }}
      Header={PageDetailHeader}
      contentStyles={contentStyles}
      headerHeight={48}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
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
