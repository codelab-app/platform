import type { IApp } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ExplorerPanePage } from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

interface PagesProps {
  app?: IApp
}

const Pages: CodelabPage<
  DashboardTemplateProps<PagesProps>,
  unknown,
  PagesProps
> = observer(({ app }) => {
  return (
    <Head>
      <title>{app?.name ? `${app.name} | ` : ''} Pages | Codelab</title>
    </Head>
  )
})

export default Pages

export const getServerSideProps = auth0Instance.withPageAuthRequired()

Pages.Layout = observer(({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const { appService } = useStore()

  const [{ result: apps }, actions] = useAsync(() =>
    appService.loadAppsWithNestedPreviews({ id: appId }),
  )

  useMountEffect(actions.execute)

  return (
    <DashboardTemplate
      ExplorerPane={{
        default: ExplorerPaneType.PageList,
        items: [
          {
            key: ExplorerPaneType.PageList,
            render: () => <ExplorerPanePage appId={appId} />,
          },
        ],
      }}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children({ app: apps?.[0] })}
    </DashboardTemplate>
  )
})
