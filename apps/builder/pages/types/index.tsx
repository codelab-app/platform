import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateFieldModal,
  CreateTypeButton,
  CreateTypeModal,
  DeleteFieldModal,
  DeleteTypeModal,
  GetTypesTable,
  UpdateFieldModal,
  UpdateTypeModal,
} from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const Header = observer(() => {
  const { typeService } = useStore()

  const headerButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`} key={0}>
      <CreateTypeButton key={0} typeService={typeService} />
    </div>,
  ]

  return (
    <PageHeader
      extra={headerButtons}
      // onBack={() => router.back()}
      ghost={false}
      title="Types"
    />
  )
})

const TypesPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { userService, typeService, fieldService } = useStore()

  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <CreateFieldModal fieldService={fieldService} typeService={typeService} />
      <UpdateFieldModal fieldService={fieldService} typeService={typeService} />
      <DeleteFieldModal fieldService={fieldService} />
      <CreateTypeModal typeService={typeService} userService={userService} />
      <DeleteTypeModal typeService={typeService} />
      <UpdateTypeModal typeService={typeService} />
      <ContentSection>
        <GetTypesTable fieldService={fieldService} typeService={typeService} />
      </ContentSection>
    </>
  )
})

export default TypesPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

TypesPage.Layout = observer((page) => {
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={Header}
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
})
