import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { DeleteTypeModalContainer } from '@codelab/frontend-application-type/use-cases/delete-type'

export const metadata: Metadata = {
  title: 'Delete Type | Codelab',
}

const Page = async ({ params }: PageProps<'typeId'>) => {
  const { typeId } = await params

  return <DeleteTypeModalContainer id={typeId} />
}

export default Page
