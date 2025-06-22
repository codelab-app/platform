import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { DeleteTagsModalContainer } from '@codelab/frontend-application-tag/use-cases/delete-tags'

export const metadata: Metadata = {
  title: 'Delete Tags | Codelab',
}

const Page = async (props: PageProps<'tagIds'>) => {
  const {
    params: { tagIds },
  } = await parsePageProps(props)

  return <DeleteTagsModalContainer ids={tagIds} />
}

export default Page
