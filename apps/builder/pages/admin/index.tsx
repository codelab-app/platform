import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { ResetDataButton } from '@codelab/frontend/modules/admin'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  commonMenuItems,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AdminPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { adminService } = useStore()

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>
      <ContentSection css={tw`p-4 bg-white`}>
        <Space>
          <ResetDataButton adminService={adminService} />
        </Space>
      </ContentSection>
    </>
  )
})

export default AdminPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

AdminPage.Layout = (page) => {
  const AdminHeader = () => <PageHeader ghost={false} title="Admin" />
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={AdminHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            ...(commonMenuItems ?? []),
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            storeMenuItem(userService.user?.curAppId),
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
