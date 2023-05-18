import { PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  ComponentsTable,
  CreateComponentModal,
  DeleteComponentModal,
  UpdateComponentModal,
} from '@codelab/frontend/domain/component'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const ComponentsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <CreateComponentModal />
      <UpdateComponentModal />
      <DeleteComponentModal />

      <ContentSection>
        <ComponentsTable />
      </ContentSection>
    </>
  )
})

const AtomsHeader = observer(() => {
  const { componentService } = useStore()

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => componentService.createModal.open(),
      title: 'Create Component',
    },
  ]

  return (
    <Header
      direction={<HeaderBreadcrumb items={[{ title: 'Components' }]} />}
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={<HeaderToolbar items={toolbarItems} title="My Header Toolbal" />}
    />
  )
})

export default ComponentsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

ComponentsPage.Layout = ({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={AtomsHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
}
