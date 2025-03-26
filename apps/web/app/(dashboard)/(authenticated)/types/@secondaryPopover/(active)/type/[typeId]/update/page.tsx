import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { UpdateTypePopoverContainer } from '@codelab/frontend-application-type/use-cases/update-type'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async ({ params }: PageProps<'typeId'>) => {
  const { typeId } = await params

  return <UpdateTypePopoverContainer id={typeId} />
}

export default Page
