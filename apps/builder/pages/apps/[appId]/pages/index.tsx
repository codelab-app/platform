import type { IApp } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  ExplorerPanePage,
  PageList,
  UpdatePageModal,
} from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  ExplorerPaneTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
  const { pageService, userService } = useStore()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const { appService } = useStore()

  const [{ result: apps, status }, actions] = useAsync(() =>
    appService.loadAppsWithNestedPreviews({ id: appId }),
  )

  useMountEffect(actions.execute)

  return (
    <DashboardTemplate
      ExplorerPane={ExplorerPanePage}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children({ app: apps?.[0] })}
    </DashboardTemplate>
  )
})
