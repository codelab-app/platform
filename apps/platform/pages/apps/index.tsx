import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { initAuth0 } from '@auth0/nextjs-auth0/edge'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuildAppModal,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppDialog,
  UpdateAppModal,
} from '@codelab/frontend/application/app'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import type { IRef } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import { Image, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const AppsPageHeader = observer(() => {
  const { appService } = useStore()

  const toolbarItems: Array<ToolbarItem> = [
    {
      icon: <ImportAppDialog key={0} />,
      key: '0',
      title: 'Import an app',
    },
    {
      icon: <PlusOutlined />,
      key: '1',
      onClick: () => appService.createModal.open(),
      title: 'Create an App',
    },
    {
      icon: <LogoutOutlined />,
      key: '2',
      onClick: () => {
        // redirect to /api/auth/logout
        window.location.href = '/api/auth/logout'
      },
      title: 'Sign Out',
    },
  ]

  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Apps' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="h-full w-full"
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar items={toolbarItems} title="My Header Toolbar" />
      }
    />
  )
})

const AppsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService, userService } = useStore()
  const user = userService.user

  const [{ status }, loadAppsPreview] = useAsync((owner: IRef) =>
    appService.loadAppsPreview({ owner }),
  )

  useEffect(() => {
    void loadAppsPreview.execute({ id: user.id })
  }, [user, loadAppsPreview])

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        {status === 'loading' || status === 'not-executed' ? (
          <Spin />
        ) : (
          <GetAppsList />
        )}
      </ContentSection>
    </>
  )
}

export default AppsPage

export const auth0Instance = () => {
  return initAuth0({
    baseURL: process.env['NEXT_PUBLIC_PLATFORM_HOST'],
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    issuerBaseURL: process.env['AUTH0_ISSUER_BASE_URL'],
    secret: process.env['AUTH0_SECRET'],
  })
}

export const withPageAuthRedirect = () => auth0Instance().withPageAuthRequired()

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
/**
 * This gets called on SSR, and props are passed to _app
 */
export const getServerSideProps = withPageAuthRedirect()

AppsPage.Layout = ({ children }) => {
  return (
    <DashboardTemplate Header={AppsPageHeader}>{children()}</DashboardTemplate>
  )
}

export const config = {
  // after login this is the page where user is redirected to,
  // cold start may take longer than default 15s on first login
  maxDuration: 30,
  runtime: 'experimental-edge',
}
