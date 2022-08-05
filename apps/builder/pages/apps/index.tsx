import { EllipsisOutlined } from '@ant-design/icons'
import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  appMenuItem,
  ContentSection,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, MenuProps, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <ImportAppButton />,
  },
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

  const [, { isLoading }] = useStatefulExecutor(() => appService.getAll(), {
    executeOnMount: true,
  })

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal appService={appService} userService={userService} />
      <UpdateAppModal appService={appService} userService={userService} />
      <DeleteAppModal appService={appService} />

      <ContentSection>
        {isLoading && <Spin />}
        {!isLoading && <GetAppsList appService={appService} />}
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
  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}
