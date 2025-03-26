import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { parsePaginationSearchParams } from '@codelab/frontend-application-shared-store/router'
import { typeTableQuery } from '@codelab/frontend-application-type/use-cases/type-table'
import { TypesPrimarySidebarContainer } from '@codelab/frontend-application-type/views'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPageProps>
}) => {
  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, fieldsDto, typesDto } = await typeTableQuery(
    await searchParams,
  )

  const params = parsePaginationSearchParams(await searchParams)

  return (
    <DomainStoreHydrator fieldsDto={fieldsDto} typesDto={typesDto}>
      <TypesPrimarySidebarContainer
        pagination={{
          totalItems: count,
        }}
        searchParams={await params}
        typesDto={typesDto}
      />
    </DomainStoreHydrator>
  )
}

export default Page
