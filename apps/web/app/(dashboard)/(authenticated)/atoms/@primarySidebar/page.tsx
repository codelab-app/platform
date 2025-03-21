import {
  Model,
  type SearchParamsPageProps,
} from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'

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
      <ApplicationStoreHydrator
        pagination={{
          data: atomsDto,
          totalItems: count,
          type: Model.Atom,
        }}
      >
        <AtomsPrimarySidebar />
      </ApplicationStoreHydrator>
    </DomainStoreHydrator>
  )
}

export default Page
