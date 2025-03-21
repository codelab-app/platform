import { type SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebarContainer } from '@codelab/frontend-application-atom/views'

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
          searchParams={await searchParams}
        />
      </ApplicationStoreHydrator>
    </DomainStoreHydrator>
  )
}

export default Page
