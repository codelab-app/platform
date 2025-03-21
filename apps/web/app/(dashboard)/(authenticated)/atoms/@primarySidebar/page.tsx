import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebarContainer } from '@codelab/frontend-application-atom/views'
import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { logTimestampMs } from '@codelab/shared/infra/logging'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  logTimestampMs('Before atomTableQuery')

  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { atomsDto, count, fieldsDto, typesDto } = await atomTableQuery(
    await searchParams,
  )

  logTimestampMs('After atomTableQuery')

  const params = parsePaginationSearchParams(await searchParams)

  return (
    <DomainStoreHydrator
      atomsDto={atomsDto}
      fieldsDto={fieldsDto}
      typesDto={typesDto}
    >
      <ApplicationStoreHydrator searchParams={await searchParams}>
        <AtomsPrimarySidebarContainer
          atomsRef={atomsDto}
          pagination={{
            totalItems: count,
          }}
          searchParams={await params}
        />
      </ApplicationStoreHydrator>
    </DomainStoreHydrator>
  )
}

export default Page
