import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  GetActionsTable,
  UpdateActionModal,
  useCurrentStoreId,
  useGetCurrentStore,
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

const ActionsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const rootStore = useStore()
  const storeId = useCurrentStoreId()
  const { store } = useGetCurrentStore(storeId, rootStore.stateStore)

  return (
    <>
      <Head>
        <title>{`${store?.name} | `}Codelab</title>
      </Head>

      <CreateActionModal actionStore={rootStore.actionStore} />
      <UpdateActionModal actionStore={rootStore.actionStore} />
      <DeleteActionsModal actionStore={rootStore.actionStore} />
      <ContentSection>
        <GetActionsTable actionStore={rootStore.actionStore} />
      </ContentSection>
    </>
  )
})

const Header = observer(() => {
  const rootStore = useStore()

  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <CreateActionButton actionStore={rootStore.actionStore} key="create" />
    </div>,
  ]

  return (
    <PageHeader extra={pageHeaderButtons} ghost={false} title="Store Actions" />
  )
})

export default ActionsPage

export const getServerSideProps = withPageAuthRequired()

ActionsPage.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})
