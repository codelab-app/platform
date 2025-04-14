import type { PageProps } from '@codelab/frontend/abstract/types'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'

const Page = async (props: PageProps<'actionId'>) => {
  const {
    params: { actionId },
  } = await parsePageProps(props)

  return <UpdateActionPopover id={actionId} />
}

export default Page
