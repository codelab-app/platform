import type { PageProps } from '@codelab/frontend-abstract-types'

import { atomTableQuery } from '@codelab/frontend-application-atom/use-cases/atom-table'
import { AtomsPrimarySidebarContainer } from '@codelab/frontend-application-atom/views'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize'>,
) => {
  const context = await parsePageProps(props)
  const { searchParams } = context

  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { atomsDto, count, fieldsDto, typesDto } = await atomTableQuery(
    searchParams,
  )

  return (
    <DomainStoreHydrator
      atomsDto={atomsDto}
      fieldsDto={fieldsDto}
      typesDto={typesDto}
    >
      <AtomsPrimarySidebarContainer
        atomsRef={atomsDto}
        context={context}
        pagination={{
          totalItems: count,
        }}
        searchParams={searchParams}
      />
    </DomainStoreHydrator>
  )
}

export default Page
