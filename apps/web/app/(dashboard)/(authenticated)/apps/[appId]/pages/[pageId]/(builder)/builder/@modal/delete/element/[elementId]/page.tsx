import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'elementId'>) => {
  const context = await parsePageProps(props)
  const { elementId } = context.params

  return <DeleteElementModalContainer context={context} id={elementId} />
}

export default Page
