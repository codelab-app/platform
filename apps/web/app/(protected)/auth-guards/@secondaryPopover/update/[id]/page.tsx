import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateAuthGuardPopover } from '@codelab/frontend-application-auth-guard/use-cases/update-auth-guard'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const authGuard = await authGuardRepository.findOne({ id_IN: [id] })

  if (!authGuard) {
    return null
  }

  return (
    <DashboardPopover>
      <DomainStoreHydrator authGuardsDto={[authGuard]} fallback={<Spinner />}>
        <UpdateAuthGuardPopover id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
