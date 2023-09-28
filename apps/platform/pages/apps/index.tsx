import { LogoutOutlined, PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared'
import {
  BuildAppModal,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppDialog,
  UpdateAppModal,
} from '@codelab/frontend/application/app'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
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
