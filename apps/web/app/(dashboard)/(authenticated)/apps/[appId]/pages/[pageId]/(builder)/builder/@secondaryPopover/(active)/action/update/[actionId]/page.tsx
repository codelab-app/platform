import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'

const Page = async ({ params }: PageProps<'actionId'>) => {
  const { actionId } = await params

  return <UpdateActionPopover id={actionId} />
}

export default Page
