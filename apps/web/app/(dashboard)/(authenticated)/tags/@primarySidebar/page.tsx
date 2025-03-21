import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { tagTableQuery } from '@codelab/frontend-application-tag/use-cases/tag-table'
import { TagsPrimarySidebarContainer } from '@codelab/frontend-application-tag/views'
import { logTimestampMs } from '@codelab/shared/infra/logging'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  logTimestampMs('Before tagTableQuery')

  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, tagsDto } = await tagTableQuery(await searchParams)

  logTimestampMs('After tagTableQuery')

  const params = parsePaginationSearchParams(await searchParams)

  return (
    <DomainStoreHydrator tagsDto={tagsDto}>
      <ApplicationStoreHydrator searchParams={await searchParams}>
        <TagsPrimarySidebarContainer
          pagination={{
            totalItems: count,
          }}
          searchParams={await params}
          tagsRef={tagsDto}
        />
      </ApplicationStoreHydrator>
    </DomainStoreHydrator>
  )
}

export default Page
