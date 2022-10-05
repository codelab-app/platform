import { EllipsisOutlined } from '@ant-design/icons'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/domain/app'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Button, Dropdown, Menu, MenuProps, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { useAsync } from 'react-use'

const items: MenuProps['items'] = [
  {
    key: '0',
    icon: (
      <Button href="/api/auth/logout" type="link">
        Sign Out
      </Button>
    ),
  },
]

const AppsPageHeader = observer(() => {
  const { appService } = useStore()

  const pageHeaderButtons = [
    <CreateAppButton appService={appService} key={0} />,
    <Dropdown key={1} overlay={<Menu items={items} />} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Apps" />
})

const AppsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService, userService } = useStore()
  const { loading, error, value } = useAsync(() => appService.getAll(), [])

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal appService={appService} userService={userService} />
      <UpdateAppModal appService={appService} userService={userService} />
      <DeleteAppModal appService={appService} />

      <ContentSection>
        {loading && <Spin />}
        {!loading && <GetAppsList appService={appService} />}
      </ContentSection>
    </>
  )
}

export default AppsPage

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
/**
 * This gets called on SSR, and props are passed to _app
 */
export const getServerSideProps = auth0Instance.withPageAuthRequired()

AppsPage.Layout = (page) => {
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}
