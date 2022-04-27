import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  ExportTypesButton,
  GetTypesTable,
  ImportTypesUpload,
  UpdateTypeModal,
} from '@codelab/frontend/modules/type'
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

const Header = observer(() => {
  const store = useStore()

  const headerButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`} key={0}>
      <ExportTypesButton
        importTypeService={store.importTypeService}
        typeService={store.typeService}
      />
      <ImportTypesUpload importTypeService={store.importTypeService} />
      <CreateTypeButton key={0} typeService={store.typeService} />
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
  const store = useStore()

  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <CreateTypeModal
        typeService={store.typeService}
        userService={store.userService}
      />
      <DeleteTypeModal typeService={store.typeService} />
      <UpdateTypeModal typeService={store.typeService} />
      <ContentSection>
        <GetTypesTable typeService={store.typeService} />
      </ContentSection>
    </>
  )
})

export default TypesPage

export const getServerSideProps = withPageAuthRequired()

TypesPage.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})
