import type { PageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import {
  parsePageProps,
  parsePaginationSearchParams,
} from '@codelab/frontend-application-shared-store/router'
import { UpdateTypePopoverContainer } from '@codelab/frontend-application-type/use-cases/update-type'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize'>,
) => {
  const {
    params: { typeId },
    searchParams,
  } = await parsePageProps(props)

  const paginationParams = parsePaginationSearchParams(searchParams)

  return <UpdateTypePopoverContainer id={typeId} params={paginationParams} />
}

export default Page
