import type { PageProps } from '@codelab/frontend/abstract/types'

import { CreateAtomPopover } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (
  props: PageProps<
    never,
    'expandedKeys' | 'filter' | 'page' | 'pageSize' | 'search' | 'selectedKey'
  >,
) => {
  const context = await parsePageProps(props)

  return <CreateAtomPopover context={context} />
}

export default Page
