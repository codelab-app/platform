import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateAtomConnector from './page.connector'

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const {
    id
  } = params;

  const atomDto = await atomRepository.findOne({ id })
  const atomsDto = atomDto ? [atomDto] : []
  const tagsDto = atomDto?.tags ?? []

  return (
    <DashboardPopover>
      <UpdateAtomConnector atomsDto={atomsDto} id={id} tagsDto={tagsDto} />
    </DashboardPopover>
  )
}

export default Page
