import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteComponentModalContainer } from '@codelab/frontend-application-component/use-cases/delete-component'

export const metadata: Metadata = {
  title: 'Delete Component | Codelab',
}

const Page = async ({ params }: PageProps<'componentId'>) => {
  const { componentId } = await params

  return <DeleteComponentModalContainer id={componentId} />
}

export default Page
