import type { IApp } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
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
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

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

  const [{ error, result: app, status }, actions] = useAsync(() =>
    appService.loadAppWithNestedPreviews({ id: appId }),
  )

  useEffect(() => {
    void actions.execute()
  }, [])

  return (
    <DashboardTemplate
      ExplorerPane={() => {
        const router = useRouter()

        const headerProps = {
          onBack: () => router.push({ pathname: PageType.AppList }),
        }

        return (
          <ExplorerPaneTemplate
            header={<CreatePageButton key={0} pageService={pageService} />}
            headerProps={headerProps}
            title="Pages"
          >
            <PageList app={app} loading={status === 'loading'} />
            <CreatePageModal
              pageService={pageService}
              userService={userService}
            />
            <UpdatePageModal pageService={pageService} />
            <DeletePageModal pageService={pageService} />
          </ExplorerPaneTemplate>
        )
      }}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children({ app })}
    </DashboardTemplate>
  )
})
