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
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import tw from 'twin.macro'

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

const PageListHeader = observer(() => {
  const router = useRouter()
  const appId = useCurrentAppId()
  const { appService } = useStore()

  const appName = useMemo(
    () => (appId ? appService.app(appId)?.name : ''),
    [appId, appService],
  )

  const navigateAppPage = useCallback(async () => {
    await router.push({ pathname: PageType.AppList, query: router.query })
  }, [router])

  return (
    <div css={tw`bg-white relative h-11 border-b border-gray-300`}>
      <div
        css={tw`absolute left-3 flex items-center flex-row h-full cursor-pointer`}
        onClick={navigateAppPage}
      >
        <Image
          alt="codelab"
          css={tw`mr-3`}
          height={32}
          src="/logo.png"
          width={32}
        />
        {appName}
      </div>
    </div>
  )
})

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
