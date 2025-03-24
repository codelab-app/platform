import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebarContainer } from '@codelab/frontend-application-atom/views'
import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { logTimestampMs } from '@codelab/shared/infra/logging'

// export const dynamic = 'force-dynamic'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { atomsDto, count, fieldsDto, typesDto } = await atomTableQuery(
    await searchParams,
  )

  const params = parsePaginationSearchParams(await searchParams)

  return (
    <DomainStoreHydrator
      atomsDto={atomsDto}
      fieldsDto={fieldsDto}
      typesDto={typesDto}
    >
      <AtomsPrimarySidebarContainer
        atomsRef={atomsDto}
        pagination={{
          totalItems: count,
        }}
        searchParams={await params}
      />
    </DomainStoreHydrator>
  )
}

export default Page
