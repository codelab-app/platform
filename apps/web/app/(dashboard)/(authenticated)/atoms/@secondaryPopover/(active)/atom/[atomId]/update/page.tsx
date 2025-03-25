import type { Metadata } from 'next'

import { UpdateAtomPopoverContainer } from '@codelab/frontend-application-atom/use-cases/update-atom'

export const metadata: Metadata = {
  title: 'Update Atom | Codelab',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateAtomPopoverContainer id={id} />
}

export default Page
