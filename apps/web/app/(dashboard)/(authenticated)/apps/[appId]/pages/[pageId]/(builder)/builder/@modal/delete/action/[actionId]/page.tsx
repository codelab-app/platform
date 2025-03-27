import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeleteActionModalContainer } from '@codelab/frontend-application-store/use-cases/delete-action'

const Page = async ({ params }: PageProps<'actionId'>) => {
  const { actionId } = await params

  return <DeleteActionModalContainer id={actionId} />
}

export default Page
