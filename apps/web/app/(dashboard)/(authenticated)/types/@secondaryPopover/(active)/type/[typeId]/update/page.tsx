import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type { PageProps } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'

import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { UpdateTypePopoverContainer } from '@codelab/frontend-application-type/use-cases/update-type'

export const metadata: Metadata = {
  title: 'Update Type | Codelab',
}

const Page = async ({
  params,
  searchParams,
}: PageProps<'typeId'> & {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  const { typeId } = await params
  const props = parsePaginationSearchParams(await searchParams)

  return <UpdateTypePopoverContainer id={typeId} params={props} />
}

export default Page
