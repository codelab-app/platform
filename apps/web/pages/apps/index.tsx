import { EllipsisOutlined } from '@ant-design/icons'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const menu = (
  <Menu>
    <Menu.Item key="1">
      <ImportAppButton />
    </Menu.Item>
    <Menu.Item key="0">
      <SignOutUserButton type="link" />
    </Menu.Item>
  </Menu>
)

const AppsPageHeader = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <CreateAppButton appService={store.appService} key={0} />,
    <Dropdown key={1} overlay={menu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Apps" />
})

const AppsPage: CodelabPage<DashboardTemplateProps> = () => {
  const store = useStore()
  store.appService.getAll()

  const [, { isLoading }] = useLoadingState(() => store.appService.getAll(), {
    executeOnMount: true,
  })

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal appService={store.appService} />
      <UpdateAppModal appService={store.appService} />
      <DeleteAppModal appService={store.appService} />

      <ContentSection>
        {isLoading && <Spin />}
        {!isLoading && <GetAppsList appService={store.appService} />}
      </ContentSection>
    </>
  )
}

export default AppsPage

AppsPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
}
