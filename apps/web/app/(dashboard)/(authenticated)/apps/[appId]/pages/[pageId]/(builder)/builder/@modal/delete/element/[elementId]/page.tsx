import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'

const Page = async ({ params }: PageProps<'elementId'>) => {
  const { elementId } = await params

  return <DeleteElementModalContainer id={elementId} />
}

export default Page
