import { PlusOutlined } from '@ant-design/icons'
import { type CodelabPage, PageType } from '@codelab/frontend/abstract/types'
import {
  CreateFieldModal,
  CreateTypeModal,
  DeleteFieldModal,
  DeleteTypeModal,
  TypeEditor,
  TypesPrimarySidebar,
  UpdateFieldModal,
  UpdateTypeModal,
} from '@codelab/frontend/domain/type'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { withPageAuthRedirect } from '@codelab/frontend/shared/utils'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TypePageHeader = observer(() => {
  const { fieldService, typeService } = useStore()

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => typeService.createModal.open(),
      title: 'Create Type',
    },
  ]

  const typeToUpdate = typeService.updateForm.type?.name || ''
  const fieldToUpdate = fieldService.updateForm.field?.key || ''

  const typeOrField = typeService.updateForm.isOpen
    ? 'type'
    : fieldService.updateForm.isOpen
    ? 'field'
    : ''

  const typeOrFieldName = typeService.updateForm.isOpen
    ? typeToUpdate
    : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Types' },
            { title: typeOrField },
            { title: typeOrFieldName },
          ]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="h-full w-full"
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar items={toolbarItems} title="Types Header Toolbar" />
      }
    />
  )
})

const TypesPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
      <CreateTypeModal />
      <DeleteTypeModal />
      <UpdateTypeModal />
      <ContentSection>
        <TypeEditor />
      </ContentSection>
    </>
  )
})

export default TypesPage

export const getServerSideProps = withPageAuthRedirect()

TypesPage.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={TypePageHeader}
      PrimarySidebar={{
        default: PageType.Type,
        items: [
          {
            key: PageType.Type,
            render: TypesPrimarySidebar,
          },
        ],
      }}
    >
      {children()}
    </DashboardTemplate>
  )
})
