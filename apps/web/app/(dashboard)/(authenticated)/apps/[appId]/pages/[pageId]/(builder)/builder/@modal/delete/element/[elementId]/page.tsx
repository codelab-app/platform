import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'elementId'>) => {
  const {
    params: { elementId },
  } = await parsePageProps(props)

  return <DeleteElementModalContainer id={elementId} />
}

export default Page
