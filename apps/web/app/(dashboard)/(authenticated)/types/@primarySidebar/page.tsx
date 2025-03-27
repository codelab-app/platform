import type { PageProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import {
  parsePageProps,
  parsePaginationSearchParams,
} from '@codelab/frontend-application-shared-store/router'
import { typeTableQuery } from '@codelab/frontend-application-type/use-cases/type-table'
import { TypesPrimarySidebarContainer } from '@codelab/frontend-application-type/views'

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize'>,
) => {
  const { searchParams } = await parsePageProps(props)
  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, fieldsDto, typesDto } = await typeTableQuery(searchParams)
  const params = parsePaginationSearchParams(searchParams)

  return (
    <DomainStoreHydrator fieldsDto={fieldsDto} typesDto={typesDto}>
      <TypesPrimarySidebarContainer
        pagination={{
          totalItems: count,
        }}
        searchParams={params}
        typesDto={typesDto}
      />
    </DomainStoreHydrator>
  )
}

export default Page
