import type { PageProps } from '@codelab/frontend-abstract-types'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { tagTableQuery } from '@codelab/frontend-application-tag/use-cases/tag-table'
import { TagsPrimarySidebarContainer } from '@codelab/frontend-application-tag/views'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async (
  props: PageProps<'tagId', 'filter' | 'page' | 'pageSize'>,
) => {
  const { searchParams } = await parsePageProps(props)
  /**
   * We hydrate these to domain services, but need to also hydrate to pagination service
   */
  const { count, tagsDto } = await tagTableQuery(searchParams)

  return (
    <DomainStoreHydrator tagsDto={tagsDto}>
      <TagsPrimarySidebarContainer
        pagination={{
          totalItems: count,
        }}
        searchParams={searchParams}
        tagsRef={tagsDto}
      />
    </DomainStoreHydrator>
  )
}

export default Page
