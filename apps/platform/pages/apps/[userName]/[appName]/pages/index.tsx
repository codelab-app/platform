import type { IApp } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ExplorerPanePage } from '@codelab/frontend/domain/page'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
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
  const { _compoundName, app } = useCurrentApp()
  const { appService } = useStore()

  const [{ result: apps }, actions] = useAsync(() =>
    appService.loadAppsWithNestedPreviews({ _compoundName }),
  )

  useMountEffect(actions.execute)

  return (
    <DashboardTemplate
      PrimarySidebar={{
        default: ExplorerPaneType.PageList,
        items: [
          {
            key: ExplorerPaneType.PageList,
            render: () => (app ? <ExplorerPanePage appId={app.id} /> : null),
          },
        ],
      }}
    >
      {children({ app: apps?.[0] })}
    </DashboardTemplate>
  )
})
