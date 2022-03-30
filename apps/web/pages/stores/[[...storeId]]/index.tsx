import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  ActionPageHeader,
  CreateActionModal,
  DeleteActionsModal,
  GetActionsTable,
  GetStateTable,
  StatePageHeader,
  StoreMainPane,
  storeRef,
  UpdateActionModal,
  useCurrentStoreId,
  WithActionService,
  WithStoreService,
} from '@codelab/frontend/modules/store'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'
import tw from 'twin.macro'

const StatePage = observer<WithStoreService & WithTypeService>(
  ({ typeService, storeService }) => (
    <>
      <StatePageHeader storeService={storeService} />
      <GetStateTable storeService={storeService} typeService={typeService} />
    </>
  ),
)

const ActionPage = observer<WithStoreService & WithActionService>(
  ({ actionService, storeService }) => (
    <>
      <ActionPageHeader actionService={actionService} />
      <CreateActionModal
        actionService={actionService}
        storeService={storeService}
      />
      <UpdateActionModal actionService={actionService} />
      <DeleteActionsModal actionService={actionService} />

      <GetActionsTable
        actionService={actionService}
        storeService={storeService}
      />
    </>
  ),
)

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { actionService, storeService, typeService } = useStore()
  const storeId = useCurrentStoreId()

  const [getCurrentStore, { isLoading }] = useLoadingState(() =>
    storeService.getOne(storeId as string),
  )

  useEffect(() => {
    if (!storeId) {
      return
    }

    getCurrentStore().then(() =>
      storeService.setCurrentStore(storeRef(storeId)),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId])

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <ConditionalView
        condition={Boolean(storeId && storeService.currentStore?.current)}
      >
        <SpinnerWrapper isLoading={isLoading}>
          <ContentSection>
            <StatePage storeService={storeService} typeService={typeService} />
            <div css={tw`mb-5`} />
            <ActionPage
              actionService={actionService}
              storeService={storeService}
            />
          </ContentSection>
        </SpinnerWrapper>
      </ConditionalView>
    </>
  )
})

StoresPage.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      MainPane={() => <StoreMainPane storeService={store.storeService} />}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRequired()

export default StoresPage
