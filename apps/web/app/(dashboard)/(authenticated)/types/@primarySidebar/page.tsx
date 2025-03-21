import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { typeTableQuery } from '@codelab/frontend-application-type/use-cases/type-table'
import { TypesPrimarySidebarContainer } from '@codelab/frontend-application-type/views'
import { logTimestampMs } from '@codelab/shared/infra/logging'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  logTimestampMs('Before typeTableQuery')

  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, fieldsDto, types } = await typeTableQuery(await searchParams)

  logTimestampMs('After typeTableQuery')

  const params = parsePaginationSearchParams(await searchParams)

  return (
    <DomainStoreHydrator fieldsDto={fieldsDto} typesDto={types}>
      <ApplicationStoreHydrator searchParams={await searchParams}>
        <TypesPrimarySidebarContainer
          pagination={{
            totalItems: count,
          }}
          searchParams={await params}
          types={types}
        />
      </ApplicationStoreHydrator>
    </DomainStoreHydrator>
  )
}

export default Page
