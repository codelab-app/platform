import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { DeleteComponentModalContainer } from '@codelab/frontend-application-component/use-cases/delete-component'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

export const metadata: Metadata = {
  title: 'Delete Component | Codelab',
}

const Page = async (props: PageProps<'componentId'>) => {
  const {
    params: { componentId },
  } = await parsePageProps(props)

  return <DeleteComponentModalContainer id={componentId} />
}

export default Page
