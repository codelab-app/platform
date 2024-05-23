import {
  type AuthGuardsView,
  AuthGuardsViewLayout,
  CreateAuthGuardModal,
  DeleteAuthGuardModal,
  UpdateAuthGuardForm,
  UpdateAuthGuardModal,
} from '@codelab/frontend/application/auth-guard'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AuthGuardsView: AuthGuardsView = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard

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

export default AuthGuardsView

export const getServerSideProps = withPageAuthRedirect()

AuthGuardsView.Layout = AuthGuardsViewLayout
