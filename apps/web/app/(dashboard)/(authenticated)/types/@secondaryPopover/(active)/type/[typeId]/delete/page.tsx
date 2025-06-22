import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { DeleteTypeModalContainer } from '@codelab/frontend-application-type/use-cases/delete-type'

export const metadata: Metadata = {
  title: 'Delete Type | Codelab',
}

const Page = async (props: PageProps<'typeId'>) => {
  const {
    params: { typeId },
  } = await parsePageProps(props)

  return <DeleteTypeModalContainer id={typeId} />
}

export default Page
