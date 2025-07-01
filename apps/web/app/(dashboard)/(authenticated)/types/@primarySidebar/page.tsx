import type { PageProps } from '@codelab/frontend-abstract-types'

import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { typeTableQuery } from '@codelab/frontend-application-type/use-cases/type-table'
import { TypesPrimarySidebarContainer } from '@codelab/frontend-application-type/views'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async (
  props: PageProps<'typeId', 'filter' | 'page' | 'pageSize'>,
) => {
  const context = await parsePageProps(props)
  const { searchParams } = context
  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, fieldsDto, typesDto } = await typeTableQuery(searchParams)

  return (
    <DomainStoreHydrator fieldsDto={fieldsDto} typesDto={typesDto}>
      <TypesPrimarySidebarContainer
        context={context}
        pagination={{
          totalItems: count,
        }}
        typesDto={typesDto}
      />
    </DomainStoreHydrator>
  )
}

export default Page
