import type { PageProps } from '@codelab/frontend-abstract-types'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { DeleteActionModalContainer } from '@codelab/frontend-application-store/use-cases/delete-action'

const Page = async (props: PageProps<'actionId'>) => {
  const {
    params: { actionId },
  } = await parsePageProps(props)

  return <DeleteActionModalContainer id={actionId} />
}

export default Page
