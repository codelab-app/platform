import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  ExportAdminDataButton,
  ImportDataButton,
} from '@codelab/frontend/domain/admin'
import {
  Header,
  HeaderBreadcrumb,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { Image, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AdminPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>
      <ContentSection css={tw`p-4 bg-white`}>
        <Space>
          <ExportAdminDataButton />
          <ImportDataButton />
        </Space>
      </ContentSection>
    </>
  )
})

export default AdminPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

AdminPage.Layout = ({ children }) => {
  const AdminHeader = () => (
    <Header
      direction={<HeaderBreadcrumb items={[{ title: 'Admin' }]} />}
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
    />
  )

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={AdminHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
}
