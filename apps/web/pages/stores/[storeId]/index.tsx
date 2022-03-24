import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateStoreButton,
  CreateStoreModal,
  DeleteStoresModal,
  GetStoresTree,
  UpdateStoreModal,
} from '@codelab/frontend/modules/store'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>

      <CreateStoreModal stateStore={store.stateStore} />
      <UpdateStoreModal stateStore={store.stateStore} />
      <DeleteStoresModal stateStore={store.stateStore} />
      <ContentSection>
        <GetStoresTree stateStore={store.stateStore} />
      </ContentSection>
    </>
  )
})

const Header = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <CreateStoreButton key="create" stateStore={store.stateStore} />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Store" />
})

export default StoresPage

export const getServerSideProps = withPageAuthRequired()

StoresPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
