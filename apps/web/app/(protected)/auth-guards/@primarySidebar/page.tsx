import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { AuthGuardsPrimarySidebar } from '@codelab/frontend-application-auth-guard/views'
import { ResourcesPrimarySidebar } from '@codelab/frontend-application-resource/views'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'

const Page = async () => {
  const { items: authGuards } = await authGuardRepository.find()

  return (
    <DomainStoreHydrator
      authGuardsDto={authGuards}
      fallback={<ResourcesPrimarySidebar isLoading={true} />}
    >
      <AuthGuardsPrimarySidebar />
    </DomainStoreHydrator>
  )
}

export default Page
