import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  FieldsTable,
  UpdateFieldModal,
  useCurrentInterfaceId,
  useGetCurrentInterfaceWithFields,
} from '@codelab/frontend/modules/type'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const InterfaceDetailPage: CodelabPage<DashboardTemplateProps> = observer(
  () => {
    const store = useStore()

    const { type, isLoading } = useGetCurrentInterfaceWithFields(
      store.typeService,
    )

    return (
      <>
        <Head>
          <title>{type?.name ? `${type.name} | ` : ''}Codelab</title>
        </Head>

        {type && type.type === ITypeKind.InterfaceType && (
          <>
            <CreateFieldModal
              interfaceType={type}
              typeService={store.typeService}
            />
            <UpdateFieldModal
              interfaceType={type}
              typeService={store.typeService}
            />
            <DeleteFieldModal
              interfaceType={type}
              typeService={store.typeService}
            />
          </>
        )}

        <ContentSection>
          {isLoading && <Spin />}
          {!type ||
            (type.type === ITypeKind.InterfaceType && (
              <FieldsTable
                interfaceType={type}
                isLoading={isLoading}
                typeService={store.typeService}
              />
            ))}
        </ContentSection>
      </>
    )
  },
)

const Header = observer(() => {
  const store = useStore()
  const interfaceId = useCurrentInterfaceId()
  const router = useRouter()
  const interfaceType = store.typeService.type(interfaceId)

  const headerButtons = [
    <CreateFieldButton
      interfaceId={interfaceId}
      key={0}
      typeService={store.typeService}
    />,
  ]

  return (
    <PageHeader
      extra={headerButtons}
      ghost={false}
      onBack={() => router.back()}
      title={interfaceType?.name}
    />
  )
})

export default InterfaceDetailPage

export const getServerSideProps = withPageAuthRequired()

InterfaceDetailPage.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})
