import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { UpdateAtomPopoverContainer } from '@codelab/frontend-application-atom/use-cases/update-atom'

export const metadata: Metadata = {
  title: 'Update Atom | Codelab',
}

const Page = async ({ params }: PageProps<'atomId'>) => {
  const { atomId } = await params

  return <UpdateAtomPopoverContainer id={atomId} />
}

export default Page
