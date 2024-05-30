import { CreateAuthGuardModal } from '@codelab/frontend-application-auth-guard/use-cases/create-auth-guard'
import { DeleteAuthGuardModal } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'
import {
  UpdateAuthGuardForm,
  UpdateAuthGuardModal,
} from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'
import {
  AuthGuardsViewLayout,
  type IAuthGuardsView,
} from '@codelab/frontend-application-auth-guard/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AuthGuardsView: IAuthGuardsView = observer(() => {
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
