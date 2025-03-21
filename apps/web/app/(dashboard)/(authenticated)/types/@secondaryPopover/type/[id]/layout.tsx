import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

interface UpdateTypeLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

const UpdateTypeLayout = async ({
  children,
  params,
}: UpdateTypeLayoutProps) => {
  const { id } = await params
  const type = await typeRepository.findOne({ id_IN: [id] })

  if (!type) {
    return null
  }

  return (
    <DomainStoreHydrator fallback={<Spinner />} typesDto={[type]}>
      {children}
    </DomainStoreHydrator>
  )
}

export default UpdateTypeLayout
