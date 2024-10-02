import type { Metadata } from 'next'

import { CreateAuthGuardModal } from '@codelab/frontend-application-auth-guard/use-cases/create-auth-guard'
import { DeleteAuthGuardModal } from '@codelab/frontend-application-auth-guard/use-cases/delete-auth-guard'
import {
  UpdateAuthGuardForm,
  UpdateAuthGuardModal,
} from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  title: 'Auth Guards | Codelab',
}

const AuthGuardsRoute = () => {
  return (
    <ContentSection>
      <CreateAuthGuardModal />
      <UpdateAuthGuardModal />
      <DeleteAuthGuardModal />
      <UpdateAuthGuardForm />
    </ContentSection>
  )
}

export default AuthGuardsRoute
