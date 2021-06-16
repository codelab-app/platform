import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateFieldButton,
  CreateFieldModal,
  FieldsTable,
  InterfaceContext,
  withInterfaceQueryProvider,
} from '@codelab/modules/type'
import { PageHeader } from 'antd'
import { AppListLayout } from 'apps/web/src/layout/AppListLayout'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const InterfaceDetailPage = () => {
  const { interface: intface } = useContext(InterfaceContext)
  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => router.back()}
        title={intface?.name}
        extra={headerButtons}
      />
      <CreateFieldModal />
      <section style={{ marginTop: padding.sm }}>
        <FieldsTable fields={intface.fieldCollection} />
      </section>
    </>
  )
}

InterfaceDetailPage.Layout = withInterfaceQueryProvider(AppListLayout)
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
InterfaceDetailPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default InterfaceDetailPage
