import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { UpdateTypePopoverContainer } from '@codelab/frontend-application-type/use-cases/update-type'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize' | 'selectedKey'>,
) => {
  const context = await parsePageProps(props)

  return <UpdateTypePopoverContainer context={context} />
}

export default Page
