import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateComponentModal,
  DeleteComponentModal,
  GetComponentsTable,
  UpdateComponentModal,
} from '@codelab/frontend/modules/component'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { CreateComponentButton } from '../../../../libs/frontend/modules/component/src/use-cases/create-component/CreateComponentButton'

const Components: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  const [, { isLoading }] = useStatefulExecutor(
    () => store.componentService.getAll(),
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <CreateComponentModal
        componentService={store.componentService}
        userService={store.userService}
      />
      <UpdateComponentModal componentService={store.componentService} />
      <DeleteComponentModal componentService={store.componentService} />
      <ContentSection>
        {isLoading && <Spin />}
        {!isLoading && (
          <GetComponentsTable componentService={store.componentService} />
        )}
      </ContentSection>
    </>
  )
})

const Header = observer(() => {
  const store = useStore()

  return (
    <PageHeader
      extra={[
        <CreateComponentButton componentService={store.componentService} />,
      ]}
      ghost={false}
      title="Components"
    />
  )
})

export const getServerSideProps = withPageAuthRequired({})

Components.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})

export default Components
