import type { PageProps } from '@codelab/frontend/abstract/types'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { CreateTypePopover } from '@codelab/frontend-application-type/use-cases/create-type'

const Page = async (props: PageProps<'typeId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return <CreateTypePopover context={context} />
}

export default Page
