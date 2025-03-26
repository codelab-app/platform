import type { Metadata } from 'next'

import { UpdateTypePopoverContainer } from '@codelab/frontend-application-type/use-cases/update-type'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateTypePopoverContainer id={id} />
}

export default Page
