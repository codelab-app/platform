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
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

const useCurrentStore = () => {
  const rootStore = useStore()
  const { query } = useRouter()
  const currentStoreId = query.storeId as string
  const { store } = useGetCurrentStore(currentStoreId, rootStore.stateStore)

  return store
}

const ActionsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useCurrentStore()
  const rootStore = useStore()

  if (!store) {
    return null
  }

  return (
    <>
      <Head>
        <title>{`${store?.name} | `}Codelab</title>
      </Head>

      <CreateActionModal actionStore={rootStore.actionStore} store={store} />
      <UpdateActionModal actionStore={rootStore.actionStore} />
      <DeleteActionsModal actionStore={rootStore.actionStore} />
      <ContentSection>
        <GetActionsTable actionStore={rootStore.actionStore} store={store} />
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
