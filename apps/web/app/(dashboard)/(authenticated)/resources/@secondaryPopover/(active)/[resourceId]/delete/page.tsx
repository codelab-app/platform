import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { DeleteResourceModalContainer } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Delete Resource | Codelab',
}

const Page = async (props: PageProps<'resourceId'>) => {
  const {
    params: { resourceId },
  } = await parsePageProps(props)

  return <DeleteResourceModalContainer id={resourceId} />
}

export default Page
