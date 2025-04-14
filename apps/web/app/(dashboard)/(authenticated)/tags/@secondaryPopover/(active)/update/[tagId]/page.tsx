import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { UpdateTagPopoverContainer } from '@codelab/frontend-application-tag/use-cases/update-tag'

export const metadata: Metadata = {
  title: 'Update Tag | Codelab',
}

const Page = async (props: PageProps<'tagId'>) => {
  const {
    params: { tagId },
  } = await parsePageProps(props)

  return <UpdateTagPopoverContainer id={tagId} />
}

export default Page
