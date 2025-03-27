import type { PageProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebarContainer } from '@codelab/frontend-application-atom/views'
import {
  parsePageProps,
  parsePaginationSearchParams,
} from '@codelab/frontend-application-shared-store/router'

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize'>,
) => {
  const { searchParams } = await parsePageProps(props)

  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { atomsDto, count, fieldsDto, typesDto } = await atomTableQuery(
    searchParams,
  )

  const params = parsePaginationSearchParams(searchParams)

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
        searchParams={params}
      />
    </DomainStoreHydrator>
  )
}

export default Page
