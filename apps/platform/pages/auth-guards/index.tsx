import {
  type CodelabPage,
  ExplorerPaneType,
} from '@codelab/frontend/abstract/types'
import {
  AuthGuardsPrimarySidebar,
  CreateAuthGuardModal,
  DeleteAuthGuardModal,
  UpdateAuthGuardForm,
  UpdateAuthGuardModal,
} from '@codelab/frontend/application/auth-guard'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AuthGuardsPageHeader = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Auth Guards' }, { title: authGuard?.name || '' }]}
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
    />
  )
})

const AuthGuardsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard
  console.log(authGuard)

  return (
    <>
      <Head>
        <title>Auth Guards | Codelab</title>
      </Head>
      <ContentSection>
        <CreateAuthGuardModal />
        <UpdateAuthGuardModal />
        <DeleteAuthGuardModal />

        {authGuard && <UpdateAuthGuardForm />}
      </ContentSection>
    </>
  )
})

export default AuthGuardsPage

export const getServerSideProps = withPageAuthRedirect()

AuthGuardsPage.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={AuthGuardsPageHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.AuthGuards,
        items: [
          {
            key: ExplorerPaneType.AuthGuards,
            render: AuthGuardsPrimarySidebar,
          },
        ],
      }}
    >
      {children()}
    </DashboardTemplate>
  )
})
