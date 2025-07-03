import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { UpdateAtomPopoverContainer } from '@codelab/frontend-application-atom/use-cases/update-atom'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

export const metadata: Metadata = {
  title: 'Update Atom | Codelab',
}

const Page = async (props: PageProps<'atomId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return <UpdateAtomPopoverContainer context={context} />
}

export default Page
