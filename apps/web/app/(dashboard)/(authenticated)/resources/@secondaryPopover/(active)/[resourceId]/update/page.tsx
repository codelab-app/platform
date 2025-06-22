import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { UpdateResourcePopoverContainer } from '@codelab/frontend-application-resource/use-cases/update-resource'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

export const metadata: Metadata = {
  title: 'Update Resource | Codelab',
}

const Page = async (props: PageProps<'resourceId'>) => {
  const {
    params: { resourceId },
  } = await parsePageProps(props)

  return <UpdateResourcePopoverContainer id={resourceId} />
}

export default Page
